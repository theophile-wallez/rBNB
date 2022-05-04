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
import { SignInAndUpComponent } from './popup/sign-in-and-up/sign-in-and-up.component';
import { MyPropertiesComponent } from './dashboard/my-properties/my-properties.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPropertyComponent } from './dashboard/new-property/new-property.component';

import { CookieService } from 'ngx-cookie-service';

import { AlertNotificationComponent } from './alert-notification/alert-notification.component';
import { ConnectAdvertismentComponent } from './navbar/connect-advertisment/connect-advertisment.component';
import { UserInfosComponent } from './navbar/user-infos/user-infos.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageComponent,
    ListingComponent,
    DashboardComponent,
    PopupComponent,
    NewContractComponent,
    SignInAndUpComponent,
    MyPropertiesComponent,
    NewPropertyComponent,
    AlertNotificationComponent,
    ConnectAdvertismentComponent,
    UserInfosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
