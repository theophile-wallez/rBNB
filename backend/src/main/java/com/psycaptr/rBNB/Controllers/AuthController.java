package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.Auth;
import com.psycaptr.rBNB.Models.User;
import com.psycaptr.rBNB.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.SQLException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping()
    public ResponseEntity<User> authCheck(@RequestBody Auth auth)
            throws ExecutionException, InterruptedException, InvalidKeySpecException, NoSuchAlgorithmException {
        return authService.authCheck(auth);
    }

    @GetMapping()
    public void test (@RequestParam(value = "pwd") String pwd) throws InvalidKeySpecException, NoSuchAlgorithmException, SQLException {
        authService.newHashPassword(pwd);
    }
}
