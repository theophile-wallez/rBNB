import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public dashboardService: DashboardService,
    public helper: HelperService
  ) {}

  ngOnInit(): void {}
}
