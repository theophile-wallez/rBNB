package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RequestMapping("api/property")
@RestController
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @PostMapping("/by-user-id")
    public ResponseEntity<HttpStatus> addPropertyByUserId(
            @RequestBody Property newProperty,
            @RequestParam(value = "id") String userId

    ) throws ExecutionException, InterruptedException {
        return propertyService.addPropertyByUserId(newProperty, userId);
    }

}
