import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from 'src/services/interfaces';
import { HelperService } from './helper.service';
import { WebService } from './services/web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rBNB-client';

  constructor(
    private cookie: CookieService,
    private helper: HelperService,
    private webService: WebService
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.helper.documentClickedTarget.next(event.target);
  }
  ngOnInit() {
    this.helper.setPopupPage('newContract');
    this.readCookie();
  }

  async readCookie() {
    let userId = this.cookie.get('userId');
    if (userId !== '') {
      let response = await this.webService.getUserById(userId);
      if (response.ok) {
        let user: User = await response.json();
        this.helper.setCurrentUser(user);
      }
    }
  }
}
