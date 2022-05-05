package com.psycaptr.rBNB.Services;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.Contract;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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
        if(!areDatesValid(contract.getStartingDay(),contract.getEndingDay())) {
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

    public static boolean areDatesValid(String checkInDateString, String checkOutString) {
        LocalDate checkInDate = LocalDate.parse(checkInDateString);
        LocalDate checkOutDate = LocalDate.parse(checkOutString);
        return checkOutDate.isAfter(checkInDate);
    }

}
