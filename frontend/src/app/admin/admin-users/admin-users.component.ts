import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WebService } from 'src/app/services/web.service';
import { Property, User } from 'src/app/services/interfaces/interfaces';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { ConfirmationService } from 'primeng/api';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  properties: Property[] = [];
  user: User = {};

  constructor(
    private helper: HelperService,
    private dashboardService: DashboardService,
    private webService: WebService,
    private confirmationService: ConfirmationService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.helper.userObservable.subscribe((user: User) => {
      if (user.id) {
        this.user = user;
        this.getAllUsersAsAdmin();
      }
    });
    this.dashboardService.doRefreshPropertyList.subscribe(
      (doRefresh: Boolean) => {
        if (this.user.id && doRefresh) {
          this.getAllUsersAsAdmin();
        }
      }
    );
  }

  async getAllUsersAsAdmin() {
    let response = await this.webService.getAllUsersAsAdmin();
    if (response.ok) {
      this.users = await response.json();
      return;
    }
    this.helper.newError("Sorry, users couln't be retrieved.");
  }

  confirmDelete(event: any, user: User) {
    this.confirmationService.confirm({
      target: event.target,
      message:
        "Do you really want to delete this user? It'll also delete all his properties and active contracts!",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (user.id) {
          this.deleteUserByIdAsAdmin(user.id);
        }
      },
    });
  }

  async deleteUserByIdAsAdmin(propertyId: string) {
    let response = await this.webService.deleteUserByIdAsAdmin(propertyId);
    if (response.ok) {
      this.helper.newNotification('User successfully deleted');
      setTimeout(() => {
        if (this.user.id) {
          this.getAllUsersAsAdmin();
        }
      }, 500);
    } else {
      this.helper.newError(
        'There has been an error when trying to delete the user.'
      );
    }
  }

  onSelectUser(owner: User) {
    if (!owner.id) return;
    this.adminService.onSelectUser(owner.id);
  }
}
