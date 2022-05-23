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

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@DependsOn("FBInitialize")
public class AdminService {

    Firestore db = FirestoreClient.getFirestore();

    @Autowired
    private PropertyService propertyService;
    @Autowired
    private ContractService contractService;
    @Autowired
    private UserService userService;

    public ResponseEntity<String> deletePropertyById(String propertyId) throws ExecutionException, InterruptedException {
        return propertyService.deletePropertyById(propertyId);
    }

    public ResponseEntity<String> deleteContractById(String contractId) throws ExecutionException, InterruptedException {
        return contractService.deleteContractById(contractId);
    }

    // NEW ONES :

    public ResponseEntity<String> deletePropertiesByUserId(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = db.collection("Properties").whereEqualTo("ownerId",userId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document: documents) {
            document.getReference().delete();
        }
        return new ResponseEntity<>("Deleted "+documents.size()+" properties involving the user.",HttpStatus.OK);
    }


    public ResponseEntity<String> deleteContractsByUserId(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> contractsWhomIsOwner = db.collection("Contracts").whereEqualTo("ownerId",userId).get();
        ApiFuture<QuerySnapshot> contractsWhomIsTenant = db.collection("Contracts").whereEqualTo("tenantId",userId).get();

        List<QueryDocumentSnapshot> ownerDocuments = contractsWhomIsOwner.get().getDocuments();
        List<QueryDocumentSnapshot> tenantDocuments = contractsWhomIsTenant.get().getDocuments();

        for (QueryDocumentSnapshot document: ownerDocuments) {
            document.getReference().delete();
        }
        for (QueryDocumentSnapshot document: tenantDocuments) {
            document.getReference().delete();
        }
        int n = ownerDocuments.size() + tenantDocuments.size();
        return new ResponseEntity<>("Deleted "+n+" contracts involving the user.",HttpStatus.OK);
    }

    public ResponseEntity<String> deleteUserById(String userId) throws ExecutionException, InterruptedException {
        String propertiesBody = deletePropertiesByUserId(userId).getBody();
        String contractsBody = deleteContractsByUserId(userId).getBody();
        ApiFuture<WriteResult> writeResult = db.collection("Users").document(userId).delete();
        return new ResponseEntity<>(propertiesBody+"\n"+contractsBody+"\n"+"Deleted user.",HttpStatus.OK);
    }

}