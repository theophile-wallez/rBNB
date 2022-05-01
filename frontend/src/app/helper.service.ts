import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, Property, User } from 'src/services/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  page: string = 'dashboard';

  selectedProperty: Property = {};
  isPopupOpen: boolean = false;

  //? User management
  currentUser: User = {};

  setCurrentUser(user: User) {
    this.currentUser = user;
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

  changePage(pageName: string): void {
    this.page = pageName;
  }

  setSelectedProperty(property: Property) {
    if (this.isUserLogged()) {
      this.selectedProperty = property;
      this.setPopupPage('newContract');
    } else {
      this.setPopupPage('signIn');
    }
  }

  //! pas sûr que ce soit utile
  clearSelectedProperty() {
    this.selectedProperty = {};
  }

  isUserLogged(): boolean {
    return this.currentUser.id !== undefined;
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
    this.emitAlert(newAlert);
  }
}
