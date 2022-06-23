import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import {
  ChatInfos,
  Contract,
  Property,
  RichContract,
  User,
} from 'src/app/services/interfaces/interfaces';
import { WebService } from 'src/app/services/web/web.service';

@Component({
  selector: 'contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  constructor(
    private helper: HelperService,
    private webService: WebService,
    private chatService: ChatService
  ) {}
  user: User = {};
  waitingContracts: RichContract[] = [];
  acceptedContracts: RichContract[] = [];

  tooltipDelay: number = 400;

  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.user = user;
        if (user.contractsId && user.contractsId.length > 0) {
          this.getUserContracts(user.id);
        }
      } else {
        this.helper.changeRoute('/listing');
      }
    });
  }

  async getUserContracts(userId: string) {
    let response = await this.webService.getContractsByUserId(userId);
    if (response.ok) {
      let allContracts = await response.json();
      if (allContracts && allContracts.length > 0) {
        console.log('allContracts: ', allContracts);
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
      let cleanContract: RichContract = JSON.parse(JSON.stringify(contract));
      let isUserThePropertyOwner: boolean =
        this.isUserThePropertyOwner(contract);

      let otherUserId: string = isUserThePropertyOwner
        ? contract.tenantId ?? ''
        : contract.ownerId ?? '';
      cleanContract.isUserThePropertyOwner = isUserThePropertyOwner;
      cleanContract = this.addOtherUserInfosToContract(
        cleanContract,
        otherUserId
      );
      cleanContract = this.addPropertyInfosToContract(cleanContract);

      cleanContracts.push(cleanContract);
    });
    console.log('cleanContracts: ', cleanContracts);
    return cleanContracts;
  }

  addOtherUserInfosToContract(contract: RichContract, otherUserId: string) {
    this.getUserById(otherUserId).then((otherUser) => {
      contract.otherUser = otherUser;
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

  addPropertyInfosToContract(contract: RichContract) {
    if (contract.propertyId) {
      this.getPropertyById(contract.propertyId).then((property) => {
        contract.property = property;
      });
    }
    return contract;
  }

  async getPropertyById(propertyId: string) {
    let property: Property = {};
    let response: Response = await this.webService.getPropertyById(propertyId);
    if (response.ok) {
      property = await response.json();
      return await property;
    } else {
      return {};
    }
  }

  isUserThePropertyOwner(contract: any): boolean {
    return this.user.id === contract.ownerId;
  }

  //* Actions

  async acceptContract(contract: RichContract) {
    if (!contract.id || !contract.ownerId) return;

    let response = await this.webService.acceptContract(
      contract.id,
      contract.ownerId
    );
    if (response.ok) {
      this.helper.newNotification('The contract has been accepted.');
      setTimeout(() => {
        if (this.user.id) {
          this.getUserContracts(this.user.id);
        }
      }, 500);
    } else {
      this.helper.newError(
        'There was an issue when trying to accept the contract.'
      );
    }
  }

  async declineContract(contract: RichContract) {
    if (!contract.id) return;

    let response = await this.webService.declineContract(contract.id);
    if (response.ok) {
      this.helper.newNotification('The contract has been declined.');
      setTimeout(() => {
        if (this.user.id) {
          this.getUserContracts(this.user.id);
        }
      }, 500);
    } else {
      this.helper.newError(
        'There was an issue when trying to decline the contract.'
      );
    }
  }

  async rateProperty(contract: RichContract) {
    if (!contract.id || !contract.propertyId || !contract.rating) return;

    let response = await this.webService.rateProperty(
      contract.id,
      contract.propertyId,
      contract.rating
    );
    if (response.ok) {
      this.helper.newNotification('The property has been successfully rated.');
    } else {
      this.helper.newError(
        'There was an issue when trying to rate the property.'
      );
    }
  }

  contactOtherUser(contract: RichContract) {
    let chatInfos: ChatInfos = {
      userId: this.user.id ?? '',
      otherUserId: contract.otherUser?.id ?? '',
      contractId: contract.id ?? '',
    };
    this.chatService.changeChatInfos(chatInfos);

    this.helper.changeRoute('/chat');
  }
}
