
import { MatIconModule } from '@angular/material/icon';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { MatInputModule } from '@angular/material/input';
import { FullCalendarModule } from '@fullcalendar/angular';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoardDirectorProjectComponent } from './board-director-project/board-director-project.component';
import { UserListComponent } from './user-list/user-list.component';
import { BoardClientComponent } from './board-client/board-client.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './board-client/navbar/navbar.component';
import { AddpageComponent, CustomDateParserFormatter } from './board-client/addpage/addpage.component';
import { ShowpageComponent } from './board-client/showpage/showpage.component';
import { ApprovepageComponent } from './board-client/approvepage/approvepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BoardClientProjectActivityComponent } from './board-client-project-activity/board-client-project-activity.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BoardDirectorProjectComponent,
    UserListComponent,
    BoardClientComponent,
    NavbarComponent,
    AddpageComponent,
    ShowpageComponent,
    ApprovepageComponent,
    ListUsersComponent,
    BoardClientProjectActivityComponent
  ],
  imports: [
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    NgbModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }],
  bootstrap: [AppComponent]
})
export class AppModule {}
