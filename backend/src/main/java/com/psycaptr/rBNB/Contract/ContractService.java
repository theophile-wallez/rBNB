package com.psycaptr.rBNB.Contract;

public class ContractService {
    public static Contract getContractById(Long contractId) {
        // db call (sql)
        // handle db response
        // return response
        Contract contrat1 = new Contract();
        contrat1.setId(contractId);
        return contrat1;
    }
}
