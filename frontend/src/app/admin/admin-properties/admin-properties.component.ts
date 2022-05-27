import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { WebService } from 'src/app/services/web/web.service';
import { Property, User } from 'src/app/services/interfaces/interfaces';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.scss'],
})
export class AdminPropertiesComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];

  user: User = {};

  searchQuery: string = '';

  constructor(
    private helper: HelperService,
    private dashboardService: DashboardService,
    private webService: WebService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.user = user;
        this.getAllPropertiesAsAdmin();
      }
    });
    this.dashboardService.doRefreshPropertyList.subscribe(
      (doRefresh: Boolean) => {
        if (this.user.id && doRefresh) {
          this.getAllPropertiesAsAdmin();
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

  async getAllPropertiesAsAdmin() {
    let response = await this.webService.getAllPropertiesAsAdmin();
    if (response.ok) {
      this.properties = await response.json();
      this.filteredProperties = JSON.parse(JSON.stringify(this.properties));
    } else {
      this.helper.newError("Sorry, your properties couln't be retrieved.");
    }
  }

  filterProperties() {
    this.filteredProperties = this.properties.filter((property) => {
      let propertyInfo: string =
        property.location?.street +
        ' ' +
        property.location?.city +
        ' ' +
        property.location?.country +
        ' ' +
        property.location?.number +
        ' ' +
        property.ownerId;
      return propertyInfo
        .toLocaleLowerCase()
        .includes(this.searchQuery.toLocaleLowerCase());
    });
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
          this.getAllPropertiesAsAdmin();
        }
      }, 500);
    } else {
      this.helper.newError(
        'There has been an error when trying to delete your property.'
      );
    }
  }
}
