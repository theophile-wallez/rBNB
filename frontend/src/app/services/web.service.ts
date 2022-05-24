import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Property } from 'src/app/services/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor() {}
  //TODO CONVERT ALL FETCH TO ANGULAR HTTPCLIENT
  URL = environment.URL;

  // vvPHPRAY2LzkfJARkz0duukzyx145vzx8-Pf6HI3EqXgqvoTjumZwmxGYR3Kn1O96NM

  async getPropertiesByUserId(userId: string): Promise<Response> {
    return fetch(this.URL + '/property/by-user-id?ownerId=' + userId);
    // this.properties = await data.json();
  }

  getPropertyById(propertyId: string) {
    return fetch(this.URL + '/property/by-id?propertyId=' + propertyId);
  }

  async getAllProperties(): Promise<Response> {
    return await fetch(this.URL + '/property');
  }

  switchIsListed(propertyId: string, isListed: boolean): Promise<Response> {
    return fetch(
      this.URL +
        '/property/is-listed?propertyId=' +
        propertyId +
        '&isListed=' +
        isListed
    );
  }

  getUserById(userId: string): Promise<Response> {
    return fetch(this.URL + '/user/by-id?id=' + userId);
  }

  postPropertyByUserId(property: Property, userId: string): Promise<Response> {
    return fetch(this.URL + '/property/by-user-id?id=' + userId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });
  }

  editPropertyById(propertyId: string, property: Property): Promise<Response> {
    return fetch(this.URL + '/property/by-id?propertyId=' + propertyId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });
  }

  deletePropertyByUserId(propertyId: String): Promise<Response> {
    return fetch(this.URL + '/property/by-id?id=' + propertyId, {
      method: 'DELETE',
    });
  }

  postSignInForms(data: any): Promise<Response> {
    return fetch(this.URL + '/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  postSignOutForms(data: any): Promise<Response> {
    return fetch(this.URL + '/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  postContract(data: any): Promise<Response> {
    return fetch(this.URL + '/contract', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async getCountries(countryName: any) {
    const timeout = 3000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    if (!countryName) return;
    let response: Response = await fetch(
      'https://restcountries.com/v3.1/name/' + countryName,
      {
        signal: controller.signal,
      }
    );
    if (response.ok) {
      clearTimeout(id);
      let rawCountries = await response.json();
      return rawCountries.map((country: any) => country.name.common);
    }
  }

  async getCities(cityName: string) {
    if (!cityName) return;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': '4908ec585bmshe9764bc603b011dp10878djsn38391d0577dc',
      },
    };

    let response = await fetch(
      'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=' +
        cityName +
        '&sort=-population',
      options
    );
    if (response.ok) {
      let rawDatas = await response.json();
      let data = await rawDatas.data;
      return await data.map((rawData: any) => rawData.city);
    }
  }

  getPropertyOccupiedDates(propertyId: string): Promise<Response> {
    return fetch(
      this.URL +
        '/contract/dates-occupied/by-property-id?propertyId=' +
        propertyId
    );
  }

  getContractsByUserId(userId: string) {
    return fetch(this.URL + '/contract/by-user-id?userId=' + userId);
  }

  acceptContract(contractId: string, ownerId: string) {
    return fetch(
      this.URL +
        '/contract/accept?contractId=' +
        contractId +
        '&ownerId=' +
        ownerId,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  declineContract(contractId: string) {
    return fetch(this.URL + '/contract/by-id?id=' + contractId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  rateProperty(contractId: string, propertyId: string, rating: number) {
    return fetch(
      this.URL +
        '/contract/rating?contractId=' +
        contractId +
        '&propertyId=' +
        propertyId +
        '&rating=' +
        rating,

      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
