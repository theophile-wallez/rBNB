import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WebService } from 'src/app/services/web.service';
import { Property, User } from 'src/app/services/interfaces/interfaces';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  constructor(
    private helper: HelperService,
    private dashboardService: DashboardService,
    private webService: WebService
  ) {}

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
    let response: Response = await this.webService.switchIsListed(
      propertyId,
      isListed
    );

    if (!response.ok) {
      this.helper.newError(
        'We encountered an error while trying to ' +
          (isListed ? 'list' : 'unlist') +
          ' your property.'
      );
      return;
    }
    this.helper.newNotification(
      'Your property has been successfully ' +
        (isListed ? 'listed' : 'unlisted') +
        '.'
    );
  }

  async getPropertiesByUserId(userId: string) {
    let response = await this.webService.getPropertiesByUserId(userId);
    if (response.ok) {
      this.properties = await response.json();
      return;
    }
    this.helper.newError("Sorry, your properties couln't be retrieved.");
  }

  scrollToPropertyForm() {
    this.dashboardService.scrollToPropertyForm();
  }

  editProperty(selectedProperty: Property) {
    this.dashboardService.editProperty(selectedProperty);
  }
}
