import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from 'src/services/interfaces';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rBNB-client';

  constructor(private cookie: CookieService, private helper: HelperService) {}

  ngOnInit() {
    this.readCookie();
  }

  async readCookie() {
    let userId = this.cookie.get('userId');
    if (userId !== '') {
      let response = await this.getUserFromApi(userId);
      if (response.ok) {
        let user: User = await response.json();
        this.helper.setCurrentUser(user);
      }
    }
  }

  getUserFromApi(userId: string) {
    return fetch(environment.URL + '/user/by-id?id=' + userId);
  }
}
