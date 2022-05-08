import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WebService } from 'src/app/services/web.service';
import { Property, User } from 'src/app/services/interfaces/interfaces';

@Component({
  selector: 'my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  constructor(private helper: HelperService, private webService: WebService) {}

  properties: Property[] = [];

  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.getPropertiesByUserId(user.id);
      }
    });
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
        this.helper.newNotification(
          'Your property has been successfully ' + listedString + '.'
        );
      } else {
        let listedString: string = isListed ? 'list' : 'unlist';
        this.helper.newError(
          'We encountered an error while trying to ' +
            listedString +
            ' your property.'
        );
      }
    } catch (error) {
      let listedString: string = isListed ? 'list' : 'unlist';
      this.helper.newError(
        'We encountered an error while trying to ' +
          listedString +
          ' your property.'
      );
    }
  }

  async getPropertiesByUserId(userId: string) {
    //! ISSUE: on reload page because userId is being fetch
    try {
      let response = await this.webService.getPropertiesByUserId(userId);
      if (response.ok) {
        this.properties = await response.json();
        return;
      }
      this.helper.newError("Sorry, your properties couln't be retrieved.");
    } catch (error) {
      this.helper.newError(
        'we encountered an error while trying to load your properties.'
      );
    }
  }
}
