import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/services/interfaces/interfaces';
import { HelperService } from '../services/helper/helper.service';
import { WebService } from '../services/web/web.service';

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  searchQuery: string = '';
  placeholder: string = 'Search a property by city or street name';
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  selectedProperty!: Property;
  displayMaximizable: boolean = false;

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  constructor(public helper: HelperService, private webService: WebService) {}

  ngOnInit(): void {
    this.handleProperties();
    this.helper.selectedPropertyObservable.subscribe((property: Property) => {
      this.selectedProperty = property;
    });
  }

  async handleProperties() {
    //TODO Set userId as a HTTP parameter if user is connected
    let response = await this.webService.getAllProperties();
    this.properties = await response.json();
    this.properties.forEach((property) => {
      property.isSelected = false;
      if (property.rating && property.rating.value) {
        property.rating.value = Math.floor(property.rating.value / 20);
      }
    });
    this.filteredProperties = JSON.parse(JSON.stringify(this.properties));
  }

  getConstraints(property: Property): string {
    let constraints: string = '';
    property.constraints?.forEach((constraint) => {
      constraints += constraint;
      constraints += '.';
      constraints += '\n';
    });
    return constraints;
  }

  getServices(property: Property): string {
    let services: string = '';
    property.services?.forEach((service) => {
      services += service;
      services += '.';
      services += '\n';
    });
    return services;
  }

  getFilteredProperties() {
    this.filteredProperties = this.properties.filter((property) => {
      let searchString: string =
        property.location?.street + ' ' + property.location?.city;
      return searchString
        .toLocaleLowerCase()
        .includes(this.searchQuery.toLocaleLowerCase());
    });
  }

  setSelectedProperty(selectedProperty: Property) {
    this.helper.setSelectedProperty(selectedProperty);
  }

  unSelectAllProperties() {
    this.filteredProperties.forEach((property) => {
      property.isSelected = false;
    });
  }
}
