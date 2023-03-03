import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { FullCalendarModule } from '@fullcalendar/angular';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { BoardDirectorProjectComponent } from './board-director-project/board-director-project.component';
import { UserListComponent } from './user-list/user-list.component';
import { BoardClientComponent } from './board-client/board-client.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './board-client/navbar/navbar.component';
import { AddpageComponent, CustomDateParserFormatter } from './board-client/addpage/addpage.component';
import { ShowpageComponent } from './board-client/showpage/showpage.component';
import { ApprovepageComponent } from './board-client/approvepage/approvepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio'; 
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
     ApprovepageComponent
  ],
  imports: [
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
    MatFormFieldModule,
    MatRadioModule,
    NgbModule
    
  ],
  providers: [authInterceptorProviders,{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
