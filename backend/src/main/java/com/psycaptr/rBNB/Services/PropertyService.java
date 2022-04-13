package com.psycaptr.rBNB.Services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.Property;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@DependsOn("FBInitialize")
public class PropertyService {
    Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity<HttpStatus> addPropertyByUserId(Property property, String userId) throws ExecutionException, InterruptedException {
        property.setOwnerId(userId);
        String propertyId = addPropertyToDB(property);
        addPropertyToUser(userId, propertyId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public String addPropertyToDB(Property property) {
        String propertyId = db.collection("Properties").document().getId();
        property.setId(propertyId);
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("Properties").document(propertyId).set(property);
        return propertyId;
    }

    private void addPropertyToUser(String userId, String propertyId) {
        DocumentReference user = db.collection("Users").document(userId);
        ApiFuture<WriteResult> arrayUnion = user.update(
                "propertiesId",
                FieldValue.arrayUnion(propertyId)
        );
    }


    private void removePropertyToUser(String userId, String propertyId) throws ExecutionException, InterruptedException {
//        DocumentReference user = db.collection("Users").document(userId);
//
//        ApiFuture<WriteResult> arrayRm = user.update(
//                "propertiesId",
//                FieldValue.arrayRemove(propertyId));
    }
}
