import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { WebService } from 'src/app/services/web/web.service';
import { Property, User } from 'src/app/services/interfaces/interfaces';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  constructor(
    private helper: HelperService,
    private dashboardService: DashboardService,
    private webService: WebService,
    private confirmationService: ConfirmationService
  ) {}

  properties: Property[] = [];
  user: User = {};

  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.user = user;
        this.getPropertiesByUserId(user.id);
      }
    });
    this.dashboardService.doRefreshPropertyList.subscribe(
      (doRefresh: Boolean) => {
        if (this.user.id && doRefresh) {
          this.getPropertiesByUserId(this.user.id);
        }
      }
    );
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
    try {
      if (response.ok) {
        this.properties = await response.json();
        return;
      }
      this.helper.newError("Sorry, your properties couldn't be retrieved.");
    } catch (error) {}
  }

  scrollToPropertyForm() {
    this.dashboardService.scrollToId('propertyForm');
  }

  editProperty(selectedProperty: Property) {
    this.dashboardService.editProperty(selectedProperty);
  }

  // Delete

  confirmDelete(event: any, property: Property) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Do you really want to delete this property?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (property.id) {
          this.deleteProperty(property.id);
        }
      },
    });
  }

  async deleteProperty(propertyId: string) {
    let response = await this.webService.deletePropertyByUserId(propertyId);
    if (response.ok) {
      this.helper.newNotification('Property successfully delete');
      setTimeout(() => {
        if (this.user.id) {
          this.getPropertiesByUserId(this.user.id);
        }
      }, 500);
    } else {
      this.helper.newError(
        'There has been an error when trying to delete your property.'
      );
    }
  }
}
