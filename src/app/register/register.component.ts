import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    id: Number,
    username: null,
    email: null,
    password: null,
    role:null
  };
  // result : any ;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit(): void {

  }

  onSubmit(): void {
    let roles = [] ;
    let _roles = "" ;
    if( (document.getElementById("manager") as HTMLInputElement).checked == true  )
    {
      roles.push({ id : 3, name : "ROLE_PROJECT_MANAGER"});
      _roles +=  "  ROLE_PROJECT_MANAGER";
    }
    if( (document.getElementById("lead") as HTMLInputElement).checked == true  )
    {
    roles.push({ id : 4, name : "ROLE_tec_lead"})
    _roles +="  ROLE_tec_lead";
    }
    if( (document.getElementById("user") as HTMLInputElement).checked == true  )
    {
    roles.push({ id : 1, name : "ROLE_USER"})
    _roles +="  ROLE_USER";
    }
    if( (document.getElementById("admin") as HTMLInputElement).checked == true  )
    {
    roles.push({ id : 2, name : "ROLE_ADMIN"})
    _roles +="  ROLE_ADMIN";
    }
    let user = {...this.form, id:null, roles : roles};
    this.authService.register(this.form.username, this.form.email, this.form.password,roles).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.data.user = {...user, id : data.id, role : _roles};
        this.data.isSuccessful = true;
      },
      err => {
    console.log("err")

        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.data.user = null;
        this.data.isSuccessful = false;
      }
    );
  }

  constructor(private authService: AuthService, private router:Router,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
