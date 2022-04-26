import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Auth } from 'src/services/interfaces';
import { HelperService } from '../helper.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private helper: HelperService) {}

  auth: Auth = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

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
