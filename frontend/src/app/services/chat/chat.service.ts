import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ChatInfos } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  public chatInfosBehaviorSubject = new BehaviorSubject<ChatInfos>({
    userId: '',
    otherUserId: '',
    contractId: '',
  });
  // userObservable = this.userBehaviorSubject.asObservable();
  changeChatInfos(chatInfos: ChatInfos) {
    this.chatInfosBehaviorSubject.next(chatInfos);
  }

  getAllData(dbPath: string) {
    return new Promise<any>((resolve) => {
      this.db
        .object(dbPath)
        .valueChanges()
        .subscribe((details) => {
          resolve(details);
        });

      //this.db.collection('Contrats').valueChanges().subscribe(users => resolve(users));
    });
  }

  sendMessage(
    contrat: string,
    sender: string,
    receiver: string,
    message: string
  ) {
    let date = new Date(Date.now());
    let stringDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    this.db.list('/Conversations/' + contrat).push({
      sender: sender,
      receiver: receiver,
      message: message,
      date: stringDate,
    });

    this.db
      .object('/Contrats/' + contrat)
      .valueChanges()
      .subscribe((details) => {
        if (details == null) {
          this.db.object('/Contrats/' + contrat).set({
            contractId: contrat,
            ownerId: sender,
            tenantId: receiver,
            date: stringDate,
          });
        }
      });
  }
}
