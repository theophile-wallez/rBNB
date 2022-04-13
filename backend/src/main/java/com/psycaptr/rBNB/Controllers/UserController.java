package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.User;
import com.psycaptr.rBNB.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user)
            throws ExecutionException, InterruptedException {
        return userService.createUser(user);
    }


    @GetMapping("/by-id")
    public ResponseEntity<User> getUserById(@RequestParam(value = "id") String id)
            throws ExecutionException, InterruptedException {
        return userService.getUserById(id);
    }

    @GetMapping("/by-email")
    public ResponseEntity<User> getUserByEmail(@RequestParam(value = "email") String email)
            throws ExecutionException, InterruptedException {
        return userService.getUserByEmail(email);
    }
}
