import { Component, OnInit } from '@angular/core';
import { HousingType, Property } from 'src/services/interfaces';
import { HelperService } from '../helper.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  searchQuery: string = '';
  placeholder: string = 'Search for company, provider, user etc.';
  properties: Property[] = [];

  constructor(public helper: HelperService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getProperties();
  }

  async getProperties() {
    let data = await fetch("http://localhost:8080/api/property/properties");
    this.properties = await data.json();
  }
}
