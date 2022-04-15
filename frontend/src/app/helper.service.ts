import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  page: string = 'dashboard';

  changePage(pageName: string): void {
    this.page = pageName;
  }
}
