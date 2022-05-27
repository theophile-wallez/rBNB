import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { WebService } from 'src/app/services/web/web.service';
import {
  Contract,
  Property,
  User,
} from 'src/app/services/interfaces/interfaces';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    public helper: HelperService,
    public dashboardService: DashboardService,
    public webService: WebService
  ) {}

  properties: Property[] = [];
  users: User[] = [];
  contracts: Contract[] = [];

  ngOnInit(): void {}
}
