package com.psycaptr.rBNB.Controllers;

import com.google.cloud.firestore.DocumentSnapshot;
import com.psycaptr.rBNB.Models.Property;
import com.psycaptr.rBNB.Services.ContractService;
import com.psycaptr.rBNB.Models.Contract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RequestMapping("api/contract")
@RestController
public class ContractController {

    @Autowired
    private ContractService contractService;

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

    // TODO: Should be an update
    @GetMapping("/is-accepted")
    public ResponseEntity<?> updateIsAccepted(
            @RequestParam String contractId,
            @RequestParam String ownerId
    ) throws ExecutionException, InterruptedException {
        return contractService.updateIsAccepted(contractId, ownerId);
    }


    // (HANS) TO BE VERIFIED:
    @GetMapping("/dates-occupied/by-property-id")
    public ResponseEntity<?> getPropertyOccupiedDates(@RequestParam(defaultValue = "") String propertyId) throws ExecutionException, InterruptedException {
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
}
