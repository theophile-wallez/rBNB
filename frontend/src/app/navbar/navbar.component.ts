import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper/helper.service';
import { User } from '../services/interfaces/interfaces';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User = {};

  constructor(public helper: HelperService, public router: Router) {}

  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      this.user = user;
    });
  }

  changeRoute(path: string): void {
    this.helper.changeRoute(path);
  }
}
