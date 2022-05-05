package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Services.ContractService;
import com.psycaptr.rBNB.Models.Contract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
