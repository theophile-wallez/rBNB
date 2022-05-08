import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { User } from '../services/interfaces/interfaces';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public helper: HelperService) {}

  ngOnInit(): void {}
}
