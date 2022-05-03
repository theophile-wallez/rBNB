import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss'],
})
export class NewContractComponent implements OnInit {
  constructor(public helper: HelperService) {}
  selectedDate: string = 'checkInDate';
  checkInDate: Date = new Date();
  checkOutDate!: Date;
  minDate = new Date();
  gapBetweenDates: number = 4;

  doCheckOutDateFollowCheckInDate: boolean = true;

  ngOnInit(): void {
    this.checkOutDate = this.addDaysToDate(new Date(), this.gapBetweenDates);
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
    let pricePerDay = this.helper.selectedProperty.pricePerDay;
    return pricePerDay ? this.gapBetweenDates * pricePerDay : undefined;
  }
}
