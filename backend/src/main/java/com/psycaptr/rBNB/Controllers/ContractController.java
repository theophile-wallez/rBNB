package com.psycaptr.rBNB.Controllers;

import com.google.cloud.firestore.DocumentSnapshot;
import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Services.ContractService;
import com.psycaptr.rBNB.Models.Contract;
import com.psycaptr.rBNB.Services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RequestMapping("api/contract")
@RestController
public class ContractController {

    @Autowired
    private ContractService contractService;
    @Autowired
    private PropertyService propertyService;

//    @GetMapping("/contract-by-id")
//    public Contract getContractById(
//            @RequestParam(value = "id") String contractId
//    ) {
//        return ContractService.getContractById(contractId);
//    }
//
//    @GetMapping("/contract-by-user-id")
//    public Contract getContractByUserId(
//            @RequestParam(value = "userId") String userId
//    ) {
//        return null;
//    }

    @PostMapping()
    public ResponseEntity<?> createNewContract(
            @RequestBody Contract contract

    ) throws ExecutionException, InterruptedException {
        return contractService.createNewContract(contract);
    }

    @PutMapping ("/accept")
    public ResponseEntity<String> acceptContract(
            @RequestParam String contractId,
            @RequestParam String ownerId
    ) throws ExecutionException, InterruptedException {
        return contractService.acceptContract(contractId, ownerId);
    }

    @PutMapping("/rating")
    public ResponseEntity<?> rateContract(
            @RequestParam String contractId,
            @RequestParam String propertyId,
            @RequestParam int rating
    ) throws ExecutionException, InterruptedException {
        propertyService.updatePropertyRatingById(propertyId, rating);
        return contractService.rateContract(contractId, rating);
    }




    // (HANS) TO BE VERIFIED:
    @GetMapping("/dates-occupied/by-property-id")
    public ResponseEntity<List<List<String>>> getPropertyOccupiedDates(@RequestParam(defaultValue = "") String propertyId) throws ExecutionException, InterruptedException {
        return contractService.getPropertyOccupiedDates(propertyId);
    }

    // (HANS) TO BE VERIFIED:
    @GetMapping("/by-contract-id")
    public ResponseEntity<Contract> getContractById(@RequestParam(defaultValue = "") String contractId) throws ExecutionException, InterruptedException {
        return contractService.getContractById(contractId);
    }

    // (HANS) TO BE VERIFIED:
    @GetMapping("/by-user-id")
    public ResponseEntity<List<Contract>> getContractsByUserId(@RequestParam(defaultValue = "") String userId) throws ExecutionException, InterruptedException {
        return contractService.getContractsByUserId(userId);
    }

    @DeleteMapping("/by-id")
    public ResponseEntity<String> deleteUserById(@RequestParam String id) throws ExecutionException, InterruptedException {
        return contractService.deleteContractById(id);
    }
}
