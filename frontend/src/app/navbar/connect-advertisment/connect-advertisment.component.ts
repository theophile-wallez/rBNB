import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'connect-advertisment',
  templateUrl: './connect-advertisment.component.html',
  styleUrls: ['./connect-advertisment.component.scss'],
})
export class ConnectAdvertismentComponent {
  constructor(private helper: HelperService) {}
  openSignInPopup() {
    this.helper.setPopupPage('signIn');
  }
}
