package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.User;
import com.psycaptr.rBNB.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping()
    public <T> ResponseEntity createUser(@RequestBody User user)
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

    @DeleteMapping("/by-id")
    public ResponseEntity<String> deleteUserById(@RequestParam(value = "id") String id) throws ExecutionException, InterruptedException {
        return userService.deleteUserById(id);
    }
}
