import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/services/interfaces/interfaces';
import { HelperService } from '../services/helper.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  searchQuery: string = '';
  placeholder: string = 'Search for company, provider, user etc.';
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  selectedProperty!: Property;
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
    });
    this.filteredProperties = JSON.parse(JSON.stringify(this.properties));
  }

  getFilteredProperties() {
    this.filteredProperties = this.properties.filter((property) =>
      property.location?.street
        .toLocaleLowerCase()
        .includes(this.searchQuery.toLocaleLowerCase())
    );
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
