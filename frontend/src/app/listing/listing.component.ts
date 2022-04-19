import { Component, OnInit } from '@angular/core';
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
  // ! Dev datas
  properties: Property[] = [
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Aulnay-sous-Bois',
        street: 'avenue Jean-Jaurès',
        number: 12,
      },
      bedAmount: 2,
      pricePerDay: 60,
      squareFootage: 27,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue de Rennes',
        number: 64,
      },
      bedAmount: 3,
      pricePerDay: 130,
      squareFootage: 42,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
    {
      ownerId: 'kljaez',
      housingType: HousingType.flat,
      location: {
        country: 'France',
        city: 'Paris',
        street: 'avenue Parmentier',
        number: 27,
      },
      bedAmount: 2,
      pricePerDay: 90,
      squareFootage: 34,
    },
  ];

  constructor(private helper: HelperService) {}

  ngOnInit(): void {
    this.getProperties();
    console.log(this.properties);
  }

  getProperties() {
    // fetch
  }
}
