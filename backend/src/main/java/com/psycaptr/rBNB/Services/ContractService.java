package com.psycaptr.rBNB.Services;

import com.psycaptr.rBNB.Models.Contract;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

@Service
@DependsOn("FBInitialize")
public class ContractService {
    public static Contract getContractById(String contractId) {
        // db call (sql)
        // handle db response
        // return response
        return null;
    }
}
