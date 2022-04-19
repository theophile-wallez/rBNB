package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RequestMapping("api/property")
@RestController
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @PostMapping("/by-user-id")
    public ResponseEntity<HttpStatus> addPropertyByUserId(
            @RequestBody Property property,
            @RequestParam(value = "id") String userId

    ) throws ExecutionException, InterruptedException {
//        Property property = new Property(
//                userId,
//                new Location("fr",92140,"laStreet",54),
//                15,
//                500,
//                100000
//        );
        return propertyService.addPropertyByUserId(property, userId);
    }


    @GetMapping("/properties")
    public List<Property> getAllProperties(@RequestParam(defaultValue = "") String ownerId) throws ExecutionException, InterruptedException {
        return propertyService.getAllProperties(ownerId);
    }


}
