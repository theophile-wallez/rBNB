import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Contract, User } from 'src/app/services/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  constructor(private helper: HelperService, private webService: WebService) {}
  user: User = {};
  waitingContracts: any[] = [];
  acceptedContracts: any[] = [];
  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.user = user;
        if (user.contractsId && user.contractsId.length > 0) {
          this.getUserContracts(user.id);
        }
      }
    });
  }

  async getUserContracts(userId: string) {
    let response = await this.webService.getContractsByUserId(userId);
    if (response.ok) {
      let allContracts = await response.json();
      if (allContracts && allContracts.length > 0) {
        this.filterContracts(allContracts);
      }
    } else {
      this.helper.newError("We couldn't retrieve your contracts.");
    }
  }

  filterContracts(contracts: Contract[]) {
    let cleanContract: any[] = this.addContractReadableInfos(contracts);
    console.log('cleanContract: ', cleanContract);
    this.acceptedContracts = cleanContract.filter(
      (contract: any) => contract.isAccepted === true
    );

    this.waitingContracts = cleanContract.filter(
      (contract: any) => contract.isAccepted === false
    );
  }

  addContractReadableInfos(contracts: Contract[]): any[] {
    let cleanContracts: any[] = [];
    contracts.forEach((contract: Contract) => {
      let cleanContract = JSON.parse(JSON.stringify(contract));
      cleanContract = this.addTenantInfosToContract(cleanContract);
      cleanContracts.push(cleanContract);
    });

    return cleanContracts;
  }

  addTenantInfosToContract(contract: any) {
    this.getUserById(contract['tenantId']).then((data) => {
      contract['tenant'] = data;
    });
    return contract;
  }

  async getUserById(userId: string) {
    let user: User = {};
    let response = await this.webService.getUserById(userId);
    if (response.ok) {
      user = await response.json();
      return await user;
    } else {
      return {};
    }
  }
}
