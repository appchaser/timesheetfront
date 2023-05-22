import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardDirectorProjectComponent } from './board-director-project/board-director-project.component';
import { BoardClientComponent } from './board-client/board-client.component';
import { AddpageComponent } from './board-client/addpage/addpage.component';
import { ShowpageComponent } from './board-client/showpage/showpage.component';
import { ApprovepageComponent } from './board-client/approvepage/approvepage.component';
import { ListUsersComponent } from './list-users/list-users.component';


import {BoardClientProjectActivityComponent  } from './board-client-project-activity/board-client-project-activity.component';


const routes: Routes = [
  { path: 'projectManagment', component: BoardClientProjectActivityComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user',component: BoardClientComponent, children: [{ path: 'add', component: AddpageComponent }, { path: 'show', component: ShowpageComponent }, { path: 'approve', component: ApprovepageComponent }] },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'director', component: BoardDirectorProjectComponent },
  { path: 'list-users', component: ListUsersComponent },

 // { path: 'home', component: BoardClientComponent, children: [{ path: 'add', component: AddpageComponent }, { path: 'show', component: ShowpageComponent }, { path: 'approve', component: ApprovepageComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
