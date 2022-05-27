import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { interval, Subscription} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})

export class ChatPageComponent implements OnInit {
  allMessages: any = {};
  messagesLength: number = 0;
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

    /*
    this.mySubscription= interval(2000).subscribe((x =>{
      console.log("refresh message");
      this.getUsers();
    }));
    */
  }

  ngOnInit(): void {
    this.getUsers();
   }


  async getUsers() {
    let allMessages = await this.service.getAllData("/Conversations/"+this.contractId);

    if(allMessages != null){
      let arr:any = [];
      Object.keys(allMessages).map(function(key){
          //console.log(allMessages[key]);
          arr.push(allMessages[key])
      });

      this.allMessages = arr.sort((b:any, a:any) => new Date(b.date.date1).getTime() - new Date(a.date.date1).getTime());
      this.messagesLength = Object.keys(this.allMessages).length;
      console.log(this.allMessages);
    }

  }

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
  }

}
