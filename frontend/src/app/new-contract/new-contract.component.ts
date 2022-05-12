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
  disabledDates: Date[] = [];
  rangeDates: Date[] = [];
  minDate = new Date();

  ngOnInit(): void {
    this.helper.selectedPropertyObservable.subscribe((property: Property) => {
      this.property = property;
      this.resetInfos();
      if (property.id) {
        this.getPropertyOccupiedDates(property.id);
      }
      if (property.ownerId) {
        this.getOwnerByOwnerId(property.ownerId);
      }
    });
  }

  resetInfos(): void {
    this.rangeDates = [];
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

  getGapBetweenDates(checkInDate: Date, checkOutDate: Date): number {
    return Math.abs(checkOutDate.getDate() - checkInDate.getDate());
  }

  //? PRICE HANDLING

  // getEstimatedPrice(): number | undefined {
  //   let pricePerDay = this.property.pricePerDay;
  //   return pricePerDay ? this.gapBetweenDates * pricePerDay : undefined;
  // }

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
      //! TO REFACTOR
      propertyId: this.property.id,
    };
    this.webService.postContract(contract);
  }

  onDateRangeChange(): void {
    if (!this.rangeDates || this.rangeDates[1] === null) return;
    if (this.getGapBetweenDates(this.rangeDates[0], this.rangeDates[1]) < 1) {
      this.rangeDates[1] = this.addDaysToDate(this.rangeDates[0], 1);
    }
    if (!this.isRangeDateValid()) {
      this.rangeDates = [];
    }
  }

  //? Handle invalids dates when contract already exist

  async getPropertyOccupiedDates(propertyId: string) {
    let response: Response = await this.webService.getPropertyOccupiedDates(
      propertyId
    );
    if (response.ok) {
      let rawOccupiedDatesArrays = await response.json();
      this.transformOccupiedDatesArrays(rawOccupiedDatesArrays);
    }
  }

  transformOccupiedDatesArrays(rawDatesRange: string[][]) {
    let disabledDates: Date[] = [];
    rawDatesRange.forEach((rawDateRange: string[]) => {
      let checkInDate: Date = new Date(rawDateRange[0]);
      let checkOutDate: Date = new Date(rawDateRange[1]);
      checkInDate.setHours(0, 0, 0, 0);
      checkOutDate.setHours(0, 0, 0, 0);
      let gap = this.getGapBetweenDates(checkInDate, checkOutDate);
      for (let index = 0; index <= gap; index++) {
        let nextDate = this.addDaysToDate(checkInDate, index);
        if (!disabledDates.includes(nextDate)) {
          disabledDates.push(nextDate);
        }
      }
    });

    this.disabledDates = disabledDates;
  }

  isRangeDateValid(): boolean {
    let isRangeDateValid: boolean = true;
    let checkInDate: Date = new Date(this.rangeDates[0]);
    let checkOutDate: Date = new Date(this.rangeDates[1]);
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);
    let gap = this.getGapBetweenDates(checkInDate, checkOutDate);
    for (let index = 0; index <= gap; index++) {
      let nextDate = this.addDaysToDate(checkInDate, index);
      if (this.isDateInDisabledDate(nextDate)) {
        isRangeDateValid = false;
        break;
      }
    }
    return isRangeDateValid;
  }

  isDateInDisabledDate(date: Date) {
    return !!this.disabledDates.find((disabledDate) => {
      return disabledDate.getTime() == date.getTime();
    });
  }
}
