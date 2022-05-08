import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WebService } from 'src/app/services/web.service';
import { Property } from 'src/app/services/interfaces/interfaces';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  constructor(private helper: HelperService, private webService: WebService) {}

  properties: Property[] = [];
  toggleColor: ThemePalette = 'warn';

  ngOnInit(): void {
    console.log('init');
    this.getPropertiesByUserId();
  }

  async switchIsListed(
    propertyId: string | undefined,
    isListed: boolean | undefined
  ) {
    if (propertyId == undefined || isListed === undefined) return;
    try {
      let response: Response = await this.webService.switchIsListed(
        propertyId,
        isListed
      );

      if (response.ok) {
        let listedString: string = isListed ? 'listed' : 'unlisted';
        console.log('isListed: ', isListed);
        this.helper.createNewAlert(
          false,
          'Your property has been successfully ' + listedString + '.'
        );
      } else {
        let listedString: string = isListed ? 'list' : 'unlist';
        this.helper.createNewAlert(
          true,
          'we encountered an error while trying to ' +
            listedString +
            ' your property.'
        );
      }
    } catch (error) {
      let listedString: string = isListed ? 'list' : 'unlist';
      this.helper.createNewAlert(
        true,
        'we encountered an error while trying to ' +
          listedString +
          ' your property.'
      );
    }
  }

  async getPropertiesByUserId() {
    let userId = this.helper.currentUser.id;
    if (userId) {
      try {
        let response = await this.webService.getPropertiesByUserId(userId);
        if (response.ok) {
          this.properties = await response.json();
          return;
        }
        this.helper.createNewAlert(
          true,
          "Sorry, your properties couln't be retrieved."
        );
      } catch (error) {
        this.helper.createNewAlert(
          true,
          'we encountered an error while trying to load your properties.'
        );
      }
    }
  }
}
