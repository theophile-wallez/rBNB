package com.psycaptr.rBNB.Services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.Contract;
import com.psycaptr.rBNB.Models.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Service
@DependsOn("FBInitialize")
public class ContractService {
    Firestore db = FirestoreClient.getFirestore();
    @Autowired
    private PropertyService propertyService;

    // (HANS) TO BE VERIFIED:
    public ResponseEntity<Contract> getContractById(String contractId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = db.collection("Contracts").whereEqualTo("id",contractId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        if(documents.size()==0) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Contract>(documents.get(0).toObject(Contract.class),HttpStatus.OK);
    }

    // (HANS) TO BE VERIFIED:
    public List<Contract> getContractsByPropertyId(String propertyId) throws ExecutionException, InterruptedException {
        List<Contract> contracts = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = db.collection("Contracts").whereEqualTo("propertyId",propertyId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            contracts.add(document.toObject(Contract.class));
        }
        return contracts;
    }
    }

    public ResponseEntity<?> createNewContract(Contract contract) throws ExecutionException, InterruptedException {
        if (Objects.equals(contract.getTenantId(), contract.getOwnerId())) {
            return new ResponseEntity<>(
                    "You can not rent your own property.",
                    HttpStatus.NOT_ACCEPTABLE
            );
        }

        if (!PropertyService.isPropertyListed(contract.getPropertyId())) {
            return new ResponseEntity<>(
                    "The selected property is not available.",
                    HttpStatus.NOT_ACCEPTABLE
            );
        }

        if (isPropertyUnderContract(contract)) {
            return new ResponseEntity<>(
                    "The selected property is not available.",
                    HttpStatus.NOT_ACCEPTABLE
            );
        }

        if (!areDatesValid(contract.getCheckInDate(), contract.getCheckOutDate())) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        String contractId = addContractToDB(contract);
        addContractIdToUser(contract.getTenantId(), contractId);
        addContractIdToUser(contract.getOwnerId(), contractId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public String addContractToDB(Contract contract) {
        String contractId = db.collection("Contracts").document().getId();
        contract.setId(contractId);
        db.collection("Contracts").document(contractId).set(contract);
        return contractId;
    }

    private void addContractIdToUser(String userId, String contractId) {
        DocumentReference user = db.collection("Users").document(userId);
        user.update("contractsId", FieldValue.arrayUnion(contractId));
    }

    private boolean areDatesValid(String checkInDateString, String checkOutString) {
        LocalDate checkInDate = LocalDate.parse(checkInDateString);
        LocalDate checkOutDate = LocalDate.parse(checkOutString);
        return checkOutDate.isAfter(checkInDate);
    }

    // (HANS) TO BE VERIFIED:
    public ResponseEntity<List<List<String>>> getPropertyOccupiedDates(String propertyId) throws ExecutionException, InterruptedException {
        List<List<String>> propertyOccupiedDates = new ArrayList<>();
        List<Contract> contracts = getContractsByPropertyId(propertyId);
        for (Contract contract: contracts) {
            propertyOccupiedDates.add(new ArrayList<String>(Arrays.asList(contract.getCheckInDate(),contract.getCheckOutDate())));
        }
        return new ResponseEntity<>(propertyOccupiedDates,HttpStatus.OK);
    }



    public ResponseEntity<?> updateIsAccepted(String contractId, String ownerId) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = db.collection("Contracts").document(contractId);
        ApiFuture<DocumentSnapshot> query = documentReference.get();
        DocumentSnapshot document = query.get();
        if (!document.exists()) {
            return new ResponseEntity<>(
                    "This contract does not exist.",
                    HttpStatus.NOT_FOUND
            );
        }
        if (document.get("ownerId") != ownerId) {
            return new ResponseEntity<>(
                    "The user ID provided does not match the ID expected.",
                    HttpStatus.NOT_ACCEPTABLE
            );
        }
        documentReference.update("isAccepted", true);
        return new ResponseEntity<>("The contract has been accepted!", HttpStatus.OK);
    }

    private Boolean isPropertyUnderContract(Contract contract) throws ExecutionException, InterruptedException {
//        TODO à repenser
        boolean isPropertyUnderContract = false;
        ApiFuture<QuerySnapshot> future = db.collection("Contracts")
                .whereEqualTo("propertyId", contract.getPropertyId()).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        if (documents.isEmpty()) {
            return false;
        }
        LocalDate contractCheckInDate = LocalDate.parse(contract.getCheckInDate());
        for (QueryDocumentSnapshot document : documents) {
            LocalDate checkInDate = LocalDate.parse(
                    Objects.requireNonNull(document.getString("checkInDate"))
            );
            LocalDate checkOutDate = LocalDate.parse(
                    Objects.requireNonNull(document.getString("checkOutDate"))
            );
            if(contractCheckInDate.isBefore(checkOutDate)) {
                isPropertyUnderContract = true;
                break;
            }

        }
        return isPropertyUnderContract;
    }
}
