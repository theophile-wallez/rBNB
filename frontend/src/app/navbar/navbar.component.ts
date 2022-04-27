import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public helper: HelperService) {}

  ngOnInit(): void {}

  changePage(pageName: string): void {
    this.helper.changePage(pageName);
  }
}
