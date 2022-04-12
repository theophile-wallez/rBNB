package com.psycaptr.rBNB.User;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    public static final String userName="owner";


    public static User getUserById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Users").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        User user = null;

        if(document.exists()) {
            user = document.toObject(User.class);
            return user;
        }
        return null;
    }

    public static String addUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        String docId = dbFirestore.collection("Users").document().getId();
        user.setId(docId);
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users").document(docId).set(user);
        return collectionsApiFuture.get().getUpdateTime().toString();
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
