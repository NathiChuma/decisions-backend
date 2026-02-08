package com.ghostcoder.decisions_backend;

import com.google.api.core.ApiFunction;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    public String createUser(User user) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> resultApiFuture = firestore.collection("users").document(user.getEmail()).set(user);

        return resultApiFuture.get().getUpdateTime().toString();
    }

    public User getUser(String documentId) throws ExecutionException, InterruptedException {
        User user;
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("users").document(documentId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();

        if(documentSnapshot.exists()){
            user = documentSnapshot.toObject(User.class);
            return user;
        }
        return null;
    }

    public String updateUser(User user) throws ExecutionException, InterruptedException {

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> resultApiFuture = firestore.collection("users").document(user.getEmail()).set(user);

        return resultApiFuture.get().getUpdateTime().toString();
    }

    public String deleteUser(String documentId) {
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection("users").document(documentId).delete();
        return "Successfully Deleted" + documentId;
    }
}
