package com.psycaptr.rBNB.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {

    @GetMapping("/user-by-id")
    public User getUserById(
            @RequestParam(value = "id") String id
    )
    {
        User user = null;
        try {
            user = UserService.getUserById(id);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    @GetMapping("/add-user")
    public String addUser() throws ExecutionException, InterruptedException {
        User theophile = new User(
                "Théophile",
                "Wallez",
                "theophile.wall@gmail.com"
        );
        return UserService.addUser(theophile);
    }
}
