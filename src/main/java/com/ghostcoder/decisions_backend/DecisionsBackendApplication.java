package com.ghostcoder.decisions_backend;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Objects;

@SpringBootApplication
public class DecisionsBackendApplication {

	public static void main(String[] args) throws IOException {

		//ClassLoader classLoader = DecisionsBackendApplication.class.getClassLoader();

		//File file = new File(Objects.requireNonNull(classLoader.getResource("src/main/resources/serviceAccountKey.json")).getFile());
		//FileInputStream serviceAccount = new FileInputStream(file.getAbsoluteFile());

		FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");

		FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

		try{
			FirebaseApp.initializeApp(options);
		}catch(Exception _){}

		SpringApplication.run(DecisionsBackendApplication.class, args);
	}

}
