import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  allConversations: any = {};
  nbrConversations: number = 0;

  constructor(private service: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.getConversations();
  }

  seeConversation(contractId: string) {
    console.log('navigate');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/chat-page', { contractId: contractId }]);
  }

  async getConversations() {
    let allConversations = await this.service.getAllData('/Contrats/');

    if (allConversations != null) {
      let arr: any = [];
      Object.keys(allConversations).map(function (key) {
        //console.log(allMessages[key]);
        arr.push(allConversations[key]);
      });

      this.allConversations = arr.sort(
        (b: any, a: any) =>
          new Date(b.date.date1).getTime() - new Date(a.date.date1).getTime()
      );
      this.nbrConversations = Object.keys(this.allConversations).length;
      console.log(this.allConversations);
    }
  }
}
