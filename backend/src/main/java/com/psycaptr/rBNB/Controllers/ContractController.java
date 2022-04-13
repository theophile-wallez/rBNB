package com.psycaptr.rBNB.Controllers;

import com.psycaptr.rBNB.Services.ContractService;
import com.psycaptr.rBNB.Models.Contract;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractController {

    @GetMapping("/contract-by-id")
    public Contract getContractById(
            @RequestParam(value = "id") Long contractId
    ) {
        return ContractService.getContractById(contractId);
    }

    @GetMapping("/contract-by-user-id")
    public Contract getContractByUserId(
            @RequestParam(value = "userId") Long userId
    ) {
        return null;
    }
}
