import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { ListingComponent } from './listing/listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopupComponent } from './popup/popup.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { LoginAndCreateAccountComponent } from './popup/login-and-create-account/login-and-create-account.component';
import { MyPropertiesComponent } from './dashboard/my-properties/my-properties.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageComponent,
    ListingComponent,
    DashboardComponent,
    PopupComponent,
    NewContractComponent,
    LoginAndCreateAccountComponent,
    MyPropertiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
