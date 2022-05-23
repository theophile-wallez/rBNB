import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingComponent } from './listing/listing.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
  { path: 'listing', component: ListingComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'chat', component: ChatPageComponent
  },
  { path: '**', redirectTo: 'listing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
