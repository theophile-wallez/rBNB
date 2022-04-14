import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  declarations: [AppComponent, CreateUserComponent, NavbarComponent, PageComponent, ListingComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
