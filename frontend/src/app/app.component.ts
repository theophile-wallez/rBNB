import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
/* Importing the environment file. */
import { environment } from 'src/environments/environment';
import { User } from 'src/app/services/interfaces/interfaces';
import { HelperService } from './services/helper.service';
import { WebService } from './services/web.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rBNB-client';

  constructor(
    private primengConfig: PrimeNGConfig,
    private cookie: CookieService,
    private helper: HelperService,
    private webService: WebService
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.helper.documentClickedTarget.next(event.target);
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.helper.setPopupPage('newContract');
    this.readCookie();
  }

  async readCookie() {
    let userId = this.cookie.get('userId');
    if (userId !== '') {
      try {
        let response = await this.webService.getUserById(userId);
        if (response.ok) {
          let user: User = await response.json();
          this.helper.setCurrentUser(user);
        }
      } catch (error) {
        this.helper.newError(
          'There has been an error while trying to connect our servers.'
        );
      }
    }
  }
}
