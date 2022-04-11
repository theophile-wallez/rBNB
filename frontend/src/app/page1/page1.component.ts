import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  phrase: String = "";
  cities: String[] = ['Tokyo',"Paris","Cranfield"];
  isTriggered: Boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    this.setData("abc");
    this.getFromBackend();
  }

  setData(newphrase: String) {
    this.phrase=newphrase;
  }

  bClick() {
    this.isTriggered=!this.isTriggered;
  }


  async getFromBackend() {
    let data = await fetch("http://localhost:8080/contract-by-id?id=1")
  }

}
