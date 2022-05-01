import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public helper: HelperService, public router: Router) {}

  ngOnInit(): void {}

  changeRoute(path: string): void {
    this.helper.closePopup();
    this.router.navigate([path]);
  }
}
