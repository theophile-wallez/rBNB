package com.psycaptr.rBNB.Contract;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractController {

    @GetMapping("/contract-by-id")
    public Contract getContractById(
            @RequestParam(value = "id") Long contractId
    ) {
        Contract contract = null;
        try {
            contract = ContractService.getContractById(contractId);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return contract;
    }

    @GetMapping("/contract-by-user-id")
    public Contract getContractByUserId(
            @RequestParam(value = "userId") Long userId
    ) {

        return null;
    }
}
