import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/services/interfaces';
import { HelperService } from '../helper.service';

@Component({
  selector: 'message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-5em)' }),
        animate('150ms ease-out', style({ transform: 'translateY(0em)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(20em)' })),
      ]),
    ]),
  ],
})
export class MessagePopupComponent implements OnInit {
  constructor(private helper: HelperService) {}
  alert: any = {};
  ngOnInit(): void {
    this.helper.alertObservable.subscribe((alert: Alert) => {
      this.alert = alert;
    });
  }

  closeAlert() {
    this.helper.alertObservable.next({});
  }
}
