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
import { NewContractComponent } from './popup/new-contract/new-contract.component';
import { SignInAndUpComponent } from './popup/sign-in-and-up/sign-in-and-up.component';
import { MyPropertiesComponent } from './dashboard/my-properties/my-properties.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPropertyComponent } from './dashboard/new-property/new-property.component';
import { RatingModule } from 'primeng/rating';

import { CookieService } from 'ngx-cookie-service';

import { AlertNotificationComponent } from './alert-notification/alert-notification.component';
import { ConnectAdvertismentComponent } from './navbar/connect-advertisment/connect-advertisment.component';
import { UserInfosComponent } from './navbar/user-infos/user-infos.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContractsComponent } from './dashboard/contracts/contracts.component';
import { TooltipModule } from 'primeng/tooltip';
import { AdminComponent } from './admin/admin.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatListComponent } from './chat-list/chat-list.component';

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
    UserProfileComponent,
    ContractsComponent,
    AdminComponent,
    AdminPropertiesComponent,
    AdminUsersComponent,
    ChatPageComponent,
    ChatListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AutoCompleteModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    RippleModule,
    InputSwitchModule,
    ConfirmPopupModule,
    ButtonModule,
    CalendarModule,
    ChipsModule,
    RatingModule,
    TooltipModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [CookieService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
