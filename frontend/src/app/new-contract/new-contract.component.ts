import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss'],
})
export class NewContractComponent implements OnInit {
  constructor(public helper: HelperService) {}
  firstDate: Date = new Date();

  ngOnInit(): void {}

  consoleDate() {
    console.log('firstDate: ', this.firstDate);
  }
}
