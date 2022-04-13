package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.Location;
import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @GetMapping("/property-by-user-id")
    public void addPropertyByUserId(
            @RequestParam(value = "id") String userId
    ) {
//        @RequestBody Property newProperty,

        Property newProperty = new Property(
                userId,
                new Location("France", 93600,"avenue Jean-Jaurès",12),
                2,
                15,
                90
        );

        try {
            propertyService.addPropertyByUserId(newProperty, userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
