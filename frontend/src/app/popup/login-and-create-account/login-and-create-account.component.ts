import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/helper.service';
import { environment } from 'src/environments/environment';
import { Auth, User } from 'src/services/interfaces';

@Component({
  selector: 'login-and-create-account',
  templateUrl: './login-and-create-account.component.html',
  styleUrls: ['./login-and-create-account.component.scss'],
})
export class LoginAndCreateAccountComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}

  newUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    rawPassword: '',
  };

  auth: Auth = {
    email: '',
    password: '',
  };

  async createUser() {
    let response = await fetch(environment.URL + '/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.newUser),
    });

    //TODO : a gérer dans une autre methode avec valeur de retour de createUser

    if (response.ok) {
      let user = await response.json();
      this.helper.setCurrentUser(user);
      console.log('content: ', user);
    }
  }

  async userLogin() {
    const response = await fetch(environment.URL + '/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.auth),
    });
    if (response.ok) {
      let user = await response.json();
      this.helper.setCurrentUser(user);
      console.log('content: ', user);
    }
  }
}
