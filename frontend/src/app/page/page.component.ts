import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'page-container',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  constructor(public helper: HelperService) {}
  ngOnInit(): void {}
}
