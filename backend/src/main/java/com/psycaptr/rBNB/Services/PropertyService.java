package com.psycaptr.rBNB.Services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.Property;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@DependsOn("FBInitialize")
public class PropertyService {
    Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity<HttpStatus> addPropertyByUserId(Property property, String userId) throws ExecutionException, InterruptedException {
        property.setOwnerId(userId);
        String propertyId = addPropertyToDB(property);
        addPropertyIdToUser(userId, propertyId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public String addPropertyToDB(Property property) {
        String propertyId = db.collection("Properties").document().getId();
        property.setId(propertyId);
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("Properties").document(propertyId).set(property);
        return propertyId;
    }

    private void addPropertyIdToUser(String userId, String propertyId) {
        DocumentReference user = db.collection("Users").document(userId);
        user.update("propertiesId", FieldValue.arrayUnion(propertyId));
    }
// TODO handle http response
    public void deletePropertyById(String id){
        ApiFuture<WriteResult> writeResult = db.collection("Properties").document(id).delete();
    }

    public List<Property> getAllProperties(String ownerId) throws ExecutionException, InterruptedException {
        List<Property> properties = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection("Properties").whereEqualTo("isListed",true).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            properties.add(document.toObject(Property.class));
        }
        Stream<Property> propertyStream = properties.stream()
                .filter(property -> !Objects.equals(property.getOwnerId(), ownerId));
        return propertyStream.collect(Collectors.toList());
    }

    public ResponseEntity<List<Property>> getPropertiesByUserId(String ownerId) throws ExecutionException, InterruptedException {
        if(ownerId.equals("")) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }

        List<Property> properties = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection("Properties").whereEqualTo("ownerId",ownerId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        if(!documents.isEmpty()) {
            for (QueryDocumentSnapshot document : documents) {
                properties.add(document.toObject(Property.class));
            }
            return new ResponseEntity<>(properties,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<Integer> getPropertiesAmountByUserId(String ownerId) throws ExecutionException, InterruptedException {
        if(ownerId.equals("")) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        ApiFuture<QuerySnapshot> future = db.collection("Properties").whereEqualTo("ownerId",ownerId).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        return ResponseEntity.ok(documents.size());
    }


    public ResponseEntity<HttpStatus> updateIsListed(String propertyId, boolean isListed) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = db.collection("Properties").document(propertyId);
        documentReference.update("isListed",isListed);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public static boolean isPropertyListed(String propertyId) throws ExecutionException, InterruptedException {
        DocumentSnapshot property = getPropertyById(propertyId);
        if(!property.exists()) {
            return false;
        }
        return Boolean.TRUE.equals(property.getBoolean("isListed"));
    }

    private static DocumentSnapshot getPropertyById(String propertyId) throws ExecutionException, InterruptedException {
        DocumentReference propertyReference = FirestoreClient.getFirestore().collection("Properties").document(propertyId);
        ApiFuture<DocumentSnapshot> propertyQuery = propertyReference.get();
        return propertyQuery.get();
    }
}
