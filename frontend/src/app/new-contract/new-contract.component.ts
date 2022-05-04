import { Component, OnInit } from '@angular/core';
import { Property } from 'src/services/interfaces';
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
  selectedDate: string = 'checkInDate';
  checkInDate: Date = new Date();
  checkOutDate!: Date;
  minDate = new Date();
  gapBetweenDates: number = 4;
  doCheckOutDateFollowCheckInDate: boolean = true;

  // ! PEUT ETRE REFACTOR FONCTIONNEMENT AVEC UN OBSERVABLE DE PROPERTY
  // ? car ngOnInit() n'est trigger QUE pour la première property choisie
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

  setSelectedDate(dateName: string): void {
    this.selectedDate = dateName;
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

  setGapBetweenDates() {
    const diffTime = Math.abs(
      this.checkOutDate.getDate() - this.checkInDate.getDate()
    );
    this.gapBetweenDates = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
    this.helper.createNewAlert(
      true,
      "Sorry, we couln't find the owner's infos."
    );
  }
}
