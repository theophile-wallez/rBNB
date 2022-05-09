import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Property } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  scrollToPropertyForm() {
    document
      ?.querySelector('#propertyForm')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToPropertyList() {
    document
      ?.querySelector('#propertyList')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  public selectedPropertyBS = new BehaviorSubject<Property>({});
  // selectedPropertyObservable = this.selectedPropertyBS.asObservable();

  setSelectedProperty(property: Property) {
    this.selectedPropertyBS.next(property);
  }

  resetUser() {
    this.selectedPropertyBS.next({});
  }

  editProperty(property: Property) {
    this.setSelectedProperty(property);
    this.scrollToPropertyForm();
  }
}
