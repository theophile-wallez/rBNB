import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Alert, Property, User } from 'src/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private cookie: CookieService, public router: Router) {}

  //? User management
  currentUser: User = {};

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.cookie.set('userId', user.id ?? 'none');
  }

  disconnectUser() {
    this.currentUser = {};
    this.cookie.delete('userId');
    this.router.navigate(['']);
    this.closePopup();
    this.createNewAlert(false, "You're now logged out");
  }

  isUserLogged(): boolean {
    return this.currentUser.id !== undefined;
  }

  //? Popup management
  defaultPopupPage: string = 'signIn';
  popupState: any = {
    isOpen: false,
    selectedPage: this.defaultPopupPage,
  };

  public popupObservable = new Subject<any>();

  emitPopupState(popupState: any) {
    this.popupObservable.next(popupState);
  }

  setPopupPage(page: string): void {
    let popupState = {
      isOpen: true,
      selectedPage: page,
    };

    this.emitPopupState(popupState);
  }

  closePopup(): void {
    let popupState = {
      isOpen: false,
      selectedPage: this.defaultPopupPage,
    };
    this.emitPopupState(popupState);
    this.resetSelectedProperty();
  }

  // selectedProperty: Property = {};

  public selectedPropertyBehavior = new BehaviorSubject<Property>({});
  selectedPropertyObservable = this.selectedPropertyBehavior.asObservable();

  emitSelectedProperty(property: Property) {
    this.selectedPropertyBehavior.next(property);
  }

  resetSelectedProperty() {
    this.emitSelectedProperty({});
  }

  setSelectedProperty(property: Property) {
    if (this.isUserLogged()) {
      this.emitSelectedProperty(property);
      this.setPopupPage('newContract');
    } else {
      this.setPopupPage('signIn');
    }
  }

  // alert-popup

  timeOut: any = undefined;
  public alertObservable = new Subject<Alert>();
  emitAlert(alert: Alert) {
    if (this.timeOut !== undefined) {
      clearTimeout(this.timeOut);
    }
    this.alertObservable.next(alert);
    this.timeOut = setTimeout(() => {
      this.alertObservable.next({});
      this.timeOut = undefined;
    }, 8000);
  }

  createNewAlert(isError: boolean, content: string) {
    let newAlert: Alert = {
      isError: isError,
      content: content,
    };
    console.log('newAlert: ', newAlert);
    this.emitAlert(newAlert);
  }

  //? Click handler
  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>();
}
