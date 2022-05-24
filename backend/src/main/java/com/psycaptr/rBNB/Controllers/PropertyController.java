package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Models.Contract;
import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
        return propertyService.addPropertyByUserId(property, userId);
    }

    @GetMapping()
    public List<Property> getAllProperties(@RequestParam(defaultValue = "") String ownerId) throws ExecutionException, InterruptedException {
        return propertyService.getAllProperties(ownerId);
    }

    @GetMapping("/by-property-id")
    public ResponseEntity<Property> getPropertyById(@RequestParam(defaultValue = "") String propertyId) throws ExecutionException, InterruptedException {
        return propertyService.getPropertyById(propertyId);
    }

    @GetMapping("/by-user-id")
    public ResponseEntity<List<Property>> getPropertiesByUserId(@RequestParam(defaultValue = "") String ownerId) throws ExecutionException, InterruptedException {
        return propertyService.getPropertiesByUserId(ownerId);
    }

    @GetMapping("/amount-by-user-id")
    public ResponseEntity<Integer> getPropertyAmountByUserId(@RequestParam(defaultValue = "") String ownerId) throws ExecutionException, InterruptedException {
        return propertyService.getPropertiesAmountByUserId(ownerId);
    }

    @PutMapping("/by-id")
    public ResponseEntity<HttpStatus> updatePropertyById(@RequestParam(defaultValue = "") String propertyId, @RequestBody Map<String, Object> newProperty) throws ExecutionException, InterruptedException {
        return propertyService.updatePropertyById(propertyId, newProperty);
    }

// TODO: Should be an update
    @GetMapping("/is-listed")
    public ResponseEntity<HttpStatus> updateIsListed(
            @RequestParam String propertyId,
            @RequestParam boolean isListed
    ) throws ExecutionException, InterruptedException {
        return propertyService.updateIsListed(propertyId,isListed);
    }

    @DeleteMapping("/by-id")
    public ResponseEntity<String> deleteUserById(@RequestParam String id) throws ExecutionException, InterruptedException {
        return propertyService.deletePropertyById(id);
    }

//    @GetMapping("/search")
//    public List<Property> getSearchCompliantProperties(@RequestParam String query) throws ExecutionException, InterruptedException {
//        //System.out.println(searchedString);
//        return propertyService.getSearchCompliantProperties(query);
//
//    }


}
