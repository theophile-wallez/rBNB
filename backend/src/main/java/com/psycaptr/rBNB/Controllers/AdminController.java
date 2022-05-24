package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.Contract;
import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Models.User;
import com.psycaptr.rBNB.Services.AdminService;
import com.psycaptr.rBNB.Services.PropertyService;
import com.psycaptr.rBNB.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/property")
    public List<Property> getAllProperties() throws ExecutionException, InterruptedException {
        return adminService.getAllProperties();
    }

    @GetMapping("/user")
    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        return adminService.getAllUsers();
    }

    @DeleteMapping("/user/by-id")
    public ResponseEntity<String> deleteUserById(@RequestParam(value = "id") String id) throws ExecutionException, InterruptedException {
        return adminService.deleteUserById(id);
    }

    @DeleteMapping("/property/by-id")
    public ResponseEntity<String> deletePropertyById(@RequestParam(value = "id") String id) throws ExecutionException, InterruptedException {
        return adminService.deletePropertyById(id);
    }

    @DeleteMapping("/contract/by-id")
    public ResponseEntity<String> deleteContractById(@RequestParam(value = "id") String id) throws ExecutionException, InterruptedException {
        return adminService.deleteContractById(id);
    }
}
