import { Injectable } from '@angular/core';
import { Property } from 'src/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  page: string = 'listing';
  selectedProperty: Property = {};
  isPopupOpen: boolean = false;

  changePage(pageName: string): void {
    this.page = pageName;
  }

  setSelectedProperty(property: Property) {
    this.selectedProperty = property;
    this.isPopupOpen = true;
  }
  clearSelectedProperty() {
    this.selectedProperty = {};
  }
}
