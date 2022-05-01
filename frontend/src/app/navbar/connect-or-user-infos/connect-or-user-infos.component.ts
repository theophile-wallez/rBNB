import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/helper.service';

@Component({
  selector: 'connect-or-user-infos',
  templateUrl: './connect-or-user-infos.component.html',
  styleUrls: ['./connect-or-user-infos.component.scss'],
})
export class ConnectOrUserInfosComponent implements OnInit {
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}

  openSignInPopup() {
    this.helper.setPopupPage('signIn');
  }
}
