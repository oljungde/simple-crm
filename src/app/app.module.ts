import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user/user.component';
import { DialogAddUserComponent } from './user/dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from './user/dialog-edit-user/dialog-edit-user.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DialogChangeUserLoginComponent } from './user/dialog-change-user-login/dialog-change-user-login.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { DialogAddCustomerComponent } from './customer/dialog-add-customer/dialog-add-customer.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogEditCustomerComponent } from './customer/dialog-edit-customer/dialog-edit-customer.component';
import { CustomerContactsComponent } from './customer-contacts/customer-contacts/customer-contacts.component';
import { DialogAddCustomerContactComponent } from './customer-contacts/dialog-add-customer-contact/dialog-add-customer-contact.component';
import { DialogEditCustomerContactComponent } from './customer-contacts/dialog-edit-customer-contact/dialog-edit-customer-contact.component';
import { CustomerRequestsComponent } from './customer-requests/customer-requests/customer-requests.component';
import { DialogAddCustomerRequestComponent } from './customer-requests/dialog-add-customer-request/dialog-add-customer-request.component';
import { DateAdapter } from '@angular/material/core';
import { StartWeekMonday } from './models/start-week-monday.class';
import { CustomerRequestsDetailComponent } from './customer-requests/customer-requests-detail/customer-requests-detail.component';
import { DialogEditCustomerRequestComponent } from './customer-requests/dialog-edit-customer-request/dialog-edit-customer-request.component';
import { DialogAddCustomerRequestNoteComponent } from './customer-requests/dialog-add-customer-request-note/dialog-add-customer-request-note.component';
import { CustomerRequestNotesComponent } from './customer-requests/customer-request-notes/customer-request-notes.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TasksComponent } from './tasks/tasks.component';


registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditUserComponent,
    LoginComponent,
    DialogChangeUserLoginComponent,
    CustomerComponent,
    DialogAddCustomerComponent,
    CustomerDetailComponent,
    DialogEditCustomerComponent,
    CustomerContactsComponent,
    DialogAddCustomerContactComponent,
    DialogEditCustomerContactComponent,
    CustomerRequestsComponent,
    DialogAddCustomerRequestComponent,
    CustomerRequestsDetailComponent,
    DialogEditCustomerRequestComponent,
    DialogAddCustomerRequestNoteComponent,
    CustomerRequestNotesComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [
    { provide: DateAdapter, useClass: StartWeekMonday }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
