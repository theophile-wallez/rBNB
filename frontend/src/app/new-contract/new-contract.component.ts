import { Component, OnInit } from '@angular/core';
import { Contract, Property } from 'src/app/services/interfaces/interfaces';
import { HelperService } from '../services/helper.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss'],
})
export class NewContractComponent implements OnInit {
  constructor(public helper: HelperService, private webService: WebService) {}
  property: Property = {};
  owner: any = {};
  //TODO clean
  checkInDate: Date = new Date();
  checkOutDate!: Date;
  rangeDates: Date[] = [];
  minDate = new Date();
  gapBetweenDates: number = 4;
  doCheckOutDateFollowCheckInDate: boolean = true;

  ngOnInit(): void {
    this.checkOutDate = this.addDaysToDate(new Date(), this.gapBetweenDates);
    this.helper.selectedPropertyObservable.subscribe((property: Property) => {
      this.property = property;
      if (property.ownerId) {
        this.getOwnerByOwnerId(property.ownerId);
      }
    });
  }

  //? DATES HANDLING

  getDateToString(date: Date): string {
    return (
      date.getDate() +
      ' ' +
      date.toLocaleString('en-us', { month: 'long' }) +
      ' ' +
      date.getFullYear()
    );
  }

  addDaysToDate(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  updateCheckOutDate() {
    this.checkOutDate = this.addDaysToDate(
      this.checkInDate,
      this.gapBetweenDates
    );
  }

  setGapBetweenDates(): void {
    this.gapBetweenDates = this.getGapBetweenDates(
      this.checkInDate,
      this.checkOutDate
    );
  }

  getGapBetweenDates(checkInDate: Date, checkOutDate: Date): number {
    const diffTime = Math.abs(checkOutDate.getDate() - checkInDate.getDate());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  //? PRICE HANDLING

  getEstimatedPrice(): number | undefined {
    let pricePerDay = this.property.pricePerDay;
    return pricePerDay ? this.gapBetweenDates * pricePerDay : undefined;
  }

  // ? OWNER HANDLING

  async getOwnerByOwnerId(ownerId: string) {
    let response = await this.webService.getUserById(ownerId);
    if (response.ok) {
      this.owner = await response.json();
      return;
    }
    this.helper.newError("Sorry, we couln't find the owner's infos.");
  }

  createNewContract() {
    let contract: Contract = {
      ownerId: this.property.ownerId,
      tenantId: this.helper.currentUser.id,
      checkInDate: this.checkInDate.toISOString().substring(0, 10),
      checkOutDate: this.checkOutDate.toISOString().substring(0, 10),
      propertyId: this.property.id,
    };
    this.webService.postContract(contract);
  }

  updateDatesFromRange() {
    if (!this.rangeDates || this.rangeDates[1] === null) return;

    if (this.getGapBetweenDates(this.rangeDates[0], this.rangeDates[1]) < 1) {
      this.rangeDates[1] = this.addDaysToDate(this.rangeDates[0], 1);
    }
  }
}
