import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { interval, Subscription } from 'rxjs';
import { ChatInfos } from '../services/interfaces/interfaces';
@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  allMessages: any = {};
  messagesLength: number = 0;
  messageContent: string = '';

  chatInfo: ChatInfos = {
    userId: '',
    otherUserId: '',
    contractId: '',
  };

  @ViewChild('messageInput') messageInput!: ElementRef;

  mySubscription: Subscription;

  constructor(private chatService: ChatService) {
    this.mySubscription = interval(2000).subscribe((x) => {
      console.log('refresh message');
      this.getUsers();
    });
  }
  ngOnInit(): void {
    this.chatService.chatInfosBehaviorSubject.subscribe(
      (chatInfo: ChatInfos) => {
        if (chatInfo.contractId && chatInfo.userId && chatInfo.otherUserId) {
          this.chatInfo = chatInfo;
          console.log('chatInfo: ', chatInfo);
        }
      }
    );
    this.getUsers();
    window.scrollTo(0, document.body.scrollHeight);
  }
  ngAfterViewInit(): void {
    this.messageInput?.nativeElement?.addEventListener(
      'keypress',
      this.submitOnEnter
    );
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  async getUsers() {
    console.log('this.chatInfo.contractId: ', this.chatInfo.contractId);
    let allMessages = await this.chatService.getAllData(
      '/Conversations/' + this.chatInfo.contractId
    );

    if (allMessages != null) {
      let arr: any = [];
      Object.keys(allMessages).map(function (key) {
        arr.push(allMessages[key]);
      });

      this.allMessages = arr.sort(
        (b: any, a: any) =>
          new Date(b.date?.date1).getTime() - new Date(a.date?.date1).getTime()
      );
      this.messagesLength = Object.keys(this.allMessages).length;
      // console.log(this.allMessages);
    }
  }

  async sendMessage(message: string) {
    await this.chatService.sendMessage(
      this.chatInfo.contractId,
      this.chatInfo.userId,
      this.chatInfo.otherUserId,
      message
    );
    this.clearMessageInput();
    this.getUsers();
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  }

  submitOnEnter(event: any) {
    if (event.which === 13) {
      event.target.form.dispatchEvent(
        new Event('submit', { cancelable: true })
      );
      event.preventDefault();
    }
  }

  clearMessageInput() {
    this.messageInput.nativeElement.value = '';
  }
}
