import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Property } from 'src/services/interfaces';

@Component({
  selector: 'my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  properties: Property[] = [];
  devData: string = 'HXgxoEgzDsBtXDJazHF7';

  constructor() {}

  ngOnInit(): void {
    this.getPropertiesByUserId();
  }

  async getPropertiesByUserId() {
    let data = await fetch(
      environment.URL + '/property/by-user-id?ownerId=' + this.devData
    );
    this.properties = await data.json();
  }
}
