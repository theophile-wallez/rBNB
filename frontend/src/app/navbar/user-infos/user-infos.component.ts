import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class UserInfosComponent implements OnInit {
  @ViewChild('popup', { read: ElementRef, static: false })
  popup!: ElementRef;

  constructor(public helper: HelperService) {}
  isPopupOpen: boolean = false;
  clickSubscription: Subscription | undefined;
  ngOnInit(): void {}

  disconnectUser() {
    this.helper.disconnectUser();
  }

  changeRoute(path: string): void {
    this.helper.changeRoute(path);
  }

  openPopup(): void {
    if (!this.clickSubscription?.closed) {
      this.clickSubscription?.unsubscribe();
    }
    this.isPopupOpen = true;
    setTimeout(() => {
      this.clickSubscription = this.helper.documentClickedTarget.subscribe(
        (target) => this.documentClickListener(target)
      );
    }, 100);
  }

  documentClickListener(target: HTMLElement): void {
    if (!this.popup.nativeElement.contains(target)) {
      this.isPopupOpen = false;
      this.clickSubscription?.unsubscribe();
    }
  }
}
