import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { Property } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  scrollToId(idName: String) {
    // propertyList;
    document
      ?.querySelector('#' + idName)
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
    this.scrollToId('propertyForm');
  }

  // REFRESH PROPERTY

  public doRefreshPropertyList = new BehaviorSubject<Boolean>(false);
  refreshPropertyList() {
    this.doRefreshPropertyList.next(true);
    setTimeout(() => {
      this.doRefreshPropertyList.next(false);
    }, 1000);
  }
}
