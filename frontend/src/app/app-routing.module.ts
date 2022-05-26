import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ContractsComponent } from './dashboard/contracts/contracts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingComponent } from './listing/listing.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
  { path: 'listing', component: ListingComponent },
  { path: 'user-profile', component: UserProfileComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'contracts',
    component: ContractsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'chat',
    component: ChatPageComponent,
  },
  { path: '**', redirectTo: 'listing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
