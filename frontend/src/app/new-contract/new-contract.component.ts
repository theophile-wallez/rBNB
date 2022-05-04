import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Property, User } from 'src/services/interfaces';
import { HelperService } from '../helper.service';

@Component({
  selector: 'new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss'],
})
export class NewContractComponent implements OnInit {
  constructor(public helper: HelperService) {}
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
    console.log('init');
    // this.owner = this.getOwnerByPropertyId();
    this.helper.selectedPropertyObservable.subscribe((property: Property) => {
      this.property = property;
      console.log('property: ', property);
      if (property.ownerId) {
        this.owner = this.getOwnerByOwnerId(property.ownerId);
        console.log('this.owner: ', this.owner);
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
    let response = await this.getUserById(ownerId);
    if (response.ok) {
      return await response.json();
    }
    this.helper.createNewAlert(true, "Can't find owner.");
    return {};
  }

  getUserById(userId: string): Promise<Response> {
    return fetch(environment.URL + '/user/by-id?id=' + userId);
  }
}
