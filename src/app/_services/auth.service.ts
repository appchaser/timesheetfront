import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API="http://localhost:8085/api/auth/";

const httpOptions = {
  headers: new HttpHeaders({

    "Access-Control-Allow-Origin": "*",

  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: any, _roles: any ): Observable<any> {
    return this.http.post("http://localhost:8085/api/users/adduser", {
      username,
      email,
      password,
      roles : _roles
    }, httpOptions);
  }
}
