package com.psycaptr.rBNB.Services;

import com.psycaptr.rBNB.Models.Auth;
import com.psycaptr.rBNB.Models.Password;
import com.psycaptr.rBNB.Models.User;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.concurrent.ExecutionException;


@Service
@DependsOn("FBInitialize")
public class AuthService {
    public <T> ResponseEntity authCheck(Auth auth)
            throws ExecutionException, InterruptedException, InvalidKeySpecException, NoSuchAlgorithmException {
        String message = "Incorrect email or password.";
        UserService userService = new UserService();
        User user = userService.getUserByEmail(auth.getEmail()).getBody();
        if (user != null) {
            String potentialHash = hashPassword(auth.getPassword(), user.getPassword().getSalt());
            if (potentialHash.equals(user.getPassword().getHash())) {
                user.setPassword(null);
                return ResponseEntity.ok(user);
            }
            return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
    }


    public String hashPassword(String password, String saltString)
            throws InvalidKeySpecException, NoSuchAlgorithmException {
        byte[] salt = Base64.getDecoder().decode(saltString);
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(salt);
        byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
        BigInteger no = new BigInteger(1, hash);
        StringBuilder hashText = new StringBuilder(no.toString(16));
        while (hashText.length() < 32) {
            hashText.insert(0, "0");
        }
        return hashText.toString();
    }

    public Password newHashPassword(String password)
            throws InvalidKeySpecException, NoSuchAlgorithmException, SQLException, SQLException {
        String SaltString = Base64.getEncoder().encodeToString(generateSalt());
        String hash = hashPassword(password, SaltString);
        return new Password(SaltString, hash);
    }

    private byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }
}
