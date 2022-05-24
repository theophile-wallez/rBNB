package com.psycaptr.rBNB.Services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Models.User;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@DependsOn("FBInitialize")
public class UserService {
    Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity createUser(User user) throws ExecutionException, InterruptedException {
        if(isUserComplete(user)) {
            if(isUserNew(user)) {
                return addUserToDb(user);
            }
            return new ResponseEntity("This email address is already used.",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("The form is incomplete.",HttpStatus.BAD_REQUEST);
//        return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);

    }

    private ResponseEntity<User> addUserToDb(User user) {
        String docId = db.collection("Users").document().getId();
        user.setId(docId);
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("Users").document(docId).set(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    // user is new if its email address doesn't belong to another user
    private boolean isUserNew(User user) throws ExecutionException, InterruptedException {
        boolean doesUserExists = getUserByEmail(user.getEmail()).hasBody();
        return !doesUserExists;
    }

    private boolean isUserComplete(User user) {
        return !user.getFirstName().isEmpty()
                && !user.getLastName().isEmpty()
                && !user.getEmail().isEmpty();
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
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
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
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        if (!documents.isEmpty())
        {
            DocumentSnapshot document = documents.get(0);
            return new ResponseEntity<>(document.toObject(User.class), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<String> deleteUserById(String id) throws ExecutionException, InterruptedException {
        //get user
        User user = getUserById(id).getBody();
        //get properties id
        if(user == null)
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        if(!userHasContract(user)){
            PropertyService propertyService = new PropertyService();
            List<String> propertiesId = user.getPropertiesId();
            for (String propertyId: propertiesId) {
                propertyService.deletePropertyById(propertyId);
            }
            ApiFuture<WriteResult> writeResult = db.collection("Users").document(id).delete();
            return new ResponseEntity<>("User successfully deleted",HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        //remove properties by id
        //same for contract
    }

    public boolean userHasContract(User user){
        return !user.getContractsId().isEmpty();
    }

    public ResponseEntity<HttpStatus> updateUserById(String id, Map<String, Object> updatedUser) {
        db.collection("Users").document(id).update(updatedUser);

        return new ResponseEntity<>(HttpStatus.OK);
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
