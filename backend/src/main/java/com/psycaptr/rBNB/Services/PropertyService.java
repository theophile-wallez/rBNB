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

    public void deletePropertyById(String id){
        ApiFuture<WriteResult> writeResult = db.collection("Properties").document(id).delete();
    }

    public List<Property> getAllProperties(String ownerId) throws ExecutionException, InterruptedException {
        List<Property> properties = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection("Properties").get();
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
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
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




//    public List<Property> getSearchCompliantProperties(String searchedString) throws ExecutionException, InterruptedException {
//        List<Property> response = new ArrayList<>();
//
//        CollectionReference properties = db.collection("Properties");
//        ApiFuture<QuerySnapshot> filteredProperties = properties
//                .whereGreaterThanOrEqualTo("location.street",searchedString)
//                .whereLessThanOrEqualTo("location.street",searchedString + "\uF7FF")
//                .get();
//        List<QueryDocumentSnapshot> documents = filteredProperties.get().getDocuments();
//        for (QueryDocumentSnapshot document : documents) {
//            response.add(document.toObject(Property.class));
//        }
//        return response;
//    }
//private void removePropertyToUser(String userId, String propertyId) throws ExecutionException, InterruptedException {
//        DocumentReference user = db.collection("Users").document(userId);
//
//        ApiFuture<WriteResult> arrayRm = user.update(
//                "propertiesId",
//                FieldValue.arrayRemove(propertyId));
//    }

    public ResponseEntity<HttpStatus> updateIsListed(String propertyId, boolean isListed) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = db.collection("Properties").document(propertyId);
        documentReference.update("isListed",isListed);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
