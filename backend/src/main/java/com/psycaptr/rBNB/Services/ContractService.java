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
import java.util.*;
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

    // (HANS) TO BE VERIFIED:
    public ResponseEntity<List<Contract>> getContractsByUserId(String userId) throws ExecutionException, InterruptedException {
        List<Contract> contracts = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = db.collection("Contracts").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        if(documents.size()==0) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        for (QueryDocumentSnapshot document : documents) {
            if(Objects.equals(userId, document.toObject(Contract.class).getTenantId())) {
                contracts.add(document.toObject(Contract.class));
            }
            else if(Objects.equals(userId, document.toObject(Contract.class).getOwnerId())) {
                contracts.add(document.toObject(Contract.class));
            }
        }
        return new ResponseEntity<>(contracts,HttpStatus.OK);
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


        if (!areDatesValid(contract.getPropertyId(),contract.getCheckInDate(), contract.getCheckOutDate())) {
            return new ResponseEntity<>("Dates are not valid",HttpStatus.NOT_ACCEPTABLE);
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

    private boolean areDatesValid(String propertyId, String checkInDateString, String checkOutString) throws ExecutionException, InterruptedException {
        LocalDate checkInDate = LocalDate.parse(checkInDateString);
        LocalDate checkOutDate = LocalDate.parse(checkOutString);
        if(!checkOutDate.isAfter(checkInDate)) {
            return false;
        }
        List<List<String>> occupiedDates = getPropertyOccupiedDates(propertyId).getBody();
        for (List<String> dateInterval:
             occupiedDates) {
            if(checkInDate.isBefore(LocalDate.parse(dateInterval.get(0))) && checkOutDate.isAfter(LocalDate.parse(dateInterval.get(0))) ||
                    checkInDate.isBefore(LocalDate.parse(dateInterval.get(1))) && checkOutDate.isAfter(LocalDate.parse(dateInterval.get(1))) ||
                    checkInDate.isBefore(LocalDate.parse(dateInterval.get(0))) && checkOutDate.isAfter(LocalDate.parse(dateInterval.get(1))) ||
                    checkInDate.isAfter(LocalDate.parse(dateInterval.get(0))) && checkOutDate.isBefore(LocalDate.parse(dateInterval.get(1))) ) {
                return false;
            }
        }
        return true;

    }

    // (HANS) TO BE VERIFIED:
    public ResponseEntity<List<List<String>>> getPropertyOccupiedDates(String propertyId) throws ExecutionException, InterruptedException {

        if(Objects.equals(propertyId, "")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<List<String>> propertyOccupiedDates = new ArrayList<>();
        List<Contract> contracts = getContractsByPropertyId(propertyId);
        for (Contract contract: contracts) {
            propertyOccupiedDates.add(new ArrayList<>(Arrays.asList(contract.getCheckInDate(),contract.getCheckOutDate())));
        }
        return new ResponseEntity<>(propertyOccupiedDates,HttpStatus.OK);
    }



    public ResponseEntity<String> acceptContract(String contractId, String ownerId) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = db.collection("Contracts").document(contractId);
        ApiFuture<DocumentSnapshot> query = documentReference.get();
        DocumentSnapshot document = query.get();
        if (!document.exists()) {
            return new ResponseEntity<>(
                    "This contract does not exist.",
                    HttpStatus.NOT_FOUND
            );
        }
        if (!Objects.equals(Objects.requireNonNull(document.get("ownerId")).toString(), ownerId)) {
            return new ResponseEntity<>(
                    "The user ID provided does not match the ID expected.",
                    HttpStatus.NOT_ACCEPTABLE
            );
        }
        documentReference.update("isAccepted", true);
        return new ResponseEntity<>("The contract has been accepted!", HttpStatus.OK);
    }


    public ResponseEntity<HttpStatus> rateContract(String contractId, int rating) throws ExecutionException, InterruptedException {
        db.collection("Contracts").document(contractId).update("rating", rating);
        return new ResponseEntity<>(HttpStatus.OK);
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

    public ResponseEntity<String> deleteContractById(String id) throws ExecutionException, InterruptedException {
        if(id.equals("") || id.equals(" ")) {
            return new ResponseEntity<>("Contract was not deleted: Provided id is not acceptable.",HttpStatus.NOT_ACCEPTABLE);
        }
        ApiFuture<QuerySnapshot> future = db.collection("Contracts").whereEqualTo("id",id).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        if(documents.isEmpty()) {
            return new ResponseEntity<>("Contract was not deleted: No contract was found.",HttpStatus.NOT_FOUND);
        }
        if(documents.size()!=1) {
            return new ResponseEntity<>("Contract was not deleted: At least two contracts share the same id.",HttpStatus.CONFLICT);
        }
        ApiFuture<WriteResult> writeResult = db.collection("Contracts").document(id).delete();
        return new ResponseEntity<>("Contract successfully deleted.",HttpStatus.OK);
    }
}
