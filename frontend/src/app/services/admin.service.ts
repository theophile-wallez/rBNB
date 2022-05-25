import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  public searchyQueryObservable = new Subject<string>();

  onSelectUser(ownerId: string) {
    this.searchyQueryObservable.next(ownerId);
  }
}
