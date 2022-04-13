package com.psycaptr.rBNB.Services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.User;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@DependsOn("FBInitialize")
public class UserService {
    Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity<User> createUser(User user) {
        String docId = db.collection("Users").document().getId();
        user.setId(docId);
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("Users").document(docId).set(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    public ResponseEntity<User> getUserById(String id) throws ExecutionException, InterruptedException {
        DocumentReference documentReference =
                db.collection("Users").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            User user = document.toObject(User.class);
            assert user != null;
            user.setPassword(null);
            return new ResponseEntity<>(document.toObject(User.class), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    /**
     *
     * @param email
     * @return user with password, not to use in endpoint
     * @throws ExecutionException
     * @throws InterruptedException
     */

    public ResponseEntity<User> getUserByEmail(String email) throws ExecutionException, InterruptedException {
        CollectionReference users = db.collection("Users");
        Query query = users.whereEqualTo("email",email).limit(1);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        DocumentSnapshot document = querySnapshot.get().getDocuments().get(0);
        if(document.exists())
            return new ResponseEntity<>(document.toObject(User.class), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }



//    public String savePatientDetails(Patient patient) throws InterruptedException, ExecutionException {
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(patient.getName()).set(patient);
//        return collectionsApiFuture.get().getUpdateTime().toString();
//    }

//    public Patient getPatientDetails(String name) throws InterruptedException, ExecutionException {
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(name);
//        ApiFuture<DocumentSnapshot> future = documentReference.get();
//
//        DocumentSnapshot document = future.get();
//
//        Patient patient = null;
//
//        if(document.exists()) {
//            patient = document.toObject(Patient.class);
//            return patient;
//        }else {
//            return null;
//        }
//    }
//
//    public String updatePatientDetails(Patient person) throws InterruptedException, ExecutionException {
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(person.getName()).set(person);
//        return collectionsApiFuture.get().getUpdateTime().toString();
//    }
//
//    public String deletePatient(String name) {
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();
//        return "Document with Patient ID "+name+" has been deleted";
//    }
}
