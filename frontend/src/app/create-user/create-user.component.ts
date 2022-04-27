import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/services/interfaces';
import { HelperService } from '../helper.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    rawPassword: '',
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

    //TODO : a gérer dans une autre methode avec valeur de retour de createUser

    if (response.ok) {
      let user = await response.json();
      this.helper.setCurrentUser(user);
      console.log('content: ', user);
    }
  }
}
