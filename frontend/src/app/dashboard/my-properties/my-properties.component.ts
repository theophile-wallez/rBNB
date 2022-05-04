import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WebService } from 'src/app/services/web.service';
import { environment } from 'src/environments/environment';
import { Property } from 'src/app/services/interfaces/interfaces';

@Component({
  selector: 'my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  constructor(private helper: HelperService, private webService: WebService) {}

  properties: Property[] = [];

  ngOnInit(): void {
    this.getPropertiesByUserId();
  }

  async getPropertiesByUserId() {
    let userId = this.helper.currentUser.id;
    if (userId) {
      let response = await this.webService.getPropertiesByUserId(userId);
      if (response.ok) {
        this.properties = await response.json();
        return;
      }
      this.helper.createNewAlert(
        true,
        "Sorry, your properties couln't be retrieved."
      );
    }
  }
}
