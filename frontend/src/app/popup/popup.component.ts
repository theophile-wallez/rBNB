import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(25em)' }),
        animate('150ms ease-out', style({ transform: 'translateX(0em)' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ transform: 'translateX(25em)' })),
      ]),
    ]),
  ],
})
export class PopupComponent implements OnInit {
  constructor(public helper: HelperService) {}
  popupState: any = {};
  ngOnInit(): void {
    this.helper.popupObservable.subscribe((popupState: any) => {
      this.popupState = popupState;
    });
  }

  closePopup() {
    this.helper.closePopup();
  }
}
