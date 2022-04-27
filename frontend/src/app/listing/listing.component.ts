import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HousingType, Property } from 'src/services/interfaces';
import { HelperService } from '../helper.service';

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

  constructor(public helper: HelperService) {}

  ngOnInit(): void {
    this.getProperties();
  }

  async getProperties() {
    let data = await fetch(environment.URL+'/property');
    this.properties = await data.json();
    this.filteredProperties = JSON.parse(JSON.stringify(this.properties));
  }

  //TODO (optional) : mixer avec bloc commenté pour etre propre

  // async getFilteredProperties() {
  //   let url = environment.URL + '/property/search?query=' + this.searchQuery;
  //   let data = await fetch(url);
  //   this.properties = await data.json();
  // }

  getFilteredProperties() {
    this.filteredProperties = this.properties.filter((property) =>
      property.location?.street
        .toLocaleLowerCase()
        .includes(this.searchQuery.toLocaleLowerCase())
    );
    console.log('this.filteredProperties', this.filteredProperties);
  }
}
