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
<<<<<<< HEAD
  messageContent: string = '';

  // userId = 'art';
  // hostId = 'jack';
  // contractId: string = '0';
  chatInfo: ChatInfos = {
    userId: '',
    otherUserId: '',
    contractId: '',
  };
=======
  userId = "art";
  hostId = "jack";
  contractId: string = "0";
  selectedFile: File = {} as File;

  //mySubscription: Subscription;

  constructor(private service: ChatService, private route: ActivatedRoute) {
    let val = this.route.snapshot.paramMap.get('contractId');
    console.log(val);
    if(val !== null){
        this.contractId = val;
    }
>>>>>>> 508ed21 (Add image and file saving function)

  @ViewChild('messageInput') messageInput!: ElementRef;

  // mySubscription: Subscription;

  constructor(private chatService: ChatService) {
    // this.mySubscription = interval(2000).subscribe((x) => {
    //   console.log('refresh message');
    //   this.getUsers();
    // });
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
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 50);
    }
  }

<<<<<<< HEAD
  async sendMessage(message: string) {
    await this.chatService.sendMessage(
      this.chatInfo.contractId,
      this.chatInfo.userId,
      this.chatInfo.otherUserId,
      message
    );
    this.getUsers();
=======
  async sendMessage(sender: string, receiver: string, message: string) {

    if(this.selectedFile.name != null){
      //console.log(this.selectedFile.name);
      let id = Math.random().toString(36).substring(2);
      this.service.sendFile(this.contractId, sender, receiver, this.selectedFile, id); 
    }

    if(message.length != 0){
      await this.service.sendMessage(this.contractId, sender, receiver, message);
    }

  }

  updateFile(event: any){
    this.selectedFile = event.target.files[0];
>>>>>>> 508ed21 (Add image and file saving function)
  }

  submitOnEnter(event: any) {
    if (event.which === 13) {
      event.target.form.dispatchEvent(
        new Event('submit', { cancelable: true })
      );
      event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
  }
}
