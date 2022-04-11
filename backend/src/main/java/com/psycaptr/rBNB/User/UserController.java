package com.psycaptr.rBNB.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user-by-id")
    public User getUserById(
            @RequestParam(value = "userId") Long userId
    )
    {
        User user = null;
        try {
            user = UserService.getUserById(userId);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }
}
