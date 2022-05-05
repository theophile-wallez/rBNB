package com.psycaptr.rBNB.Services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.Contract;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.concurrent.ExecutionException;

@Service
@DependsOn("FBInitialize")
public class ContractService {
    Firestore db = FirestoreClient.getFirestore();

    public static Contract getContractById(String contractId) {
        // db call (sql)
        // handle db response
        // return response
        return null;
    }

    public ResponseEntity<?> createNewContract(Contract contract) {
        if (!areDatesValid(contract.getStartingDay(), contract.getEndingDay())) {
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
}
