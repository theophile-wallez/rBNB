import { Component, NgModule, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth, User } from 'src/services/interfaces';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    rawPassword: 'Hello',
  };

  auth: Auth = {
    email: 'theophile.wall@gmail.com',
    password: 'Hello',
  };

  async createUser() {
    let response = await fetch(environment.URL + '/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.user),
    });
    let content = await response.json();
    console.log('content: ', content);
  }

  async connect() {
    let response = await fetch(environment.URL + '/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.auth),
    });
    let content = await response.json();
    console.log('content: ', content);
  }
}
