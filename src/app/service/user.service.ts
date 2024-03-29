import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly API_URL="http://localhost:8085/api/users"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }

  constructor(private httpClient:HttpClient) { }

  public getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.API_URL}/all`);
  }


  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.API_URL}/updateuser`, user);
  }


  deleteUser(id: number){
    return this.httpClient.delete(`${this.API_URL}/deleteUser/${id}`);
  }

}
