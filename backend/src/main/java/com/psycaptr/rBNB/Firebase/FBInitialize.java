package com.psycaptr.rBNB.Firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.InputStream;

@Service
public class FBInitialize {
    @Autowired
    ResourceLoader resourceLoader;
    @PostConstruct
    public void initialize() {
        try {
            Resource resource = resourceLoader.getResource("classpath:rbnb-b3444-firebase-adminsdk-4i0vd-9972f561cd.json");
            InputStream serviceAccount = resource.getInputStream();
//            FileInputStream serviceAccount =
//                    new FileInputStream("./rbnb-b3444-firebase-adminsdk-4i0vd-9972f561cd.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}