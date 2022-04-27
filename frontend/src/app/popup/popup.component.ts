import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(public helper: HelperService) { }

  ngOnInit(): void {
  }

}
