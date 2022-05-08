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

  async getPropertiesByUserId(userId: string): Promise<Response> {
    return fetch(this.URL + '/property/by-user-id?ownerId=' + userId);
    // this.properties = await data.json();
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
}
