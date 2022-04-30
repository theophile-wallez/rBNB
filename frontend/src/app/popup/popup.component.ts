import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(25em)' }),
        animate('200ms', style({ transform: 'translateX(0em)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(25em)' })),
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
