import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly API_URL="http://localhost:8085/api/departements"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }
  constructor(private httpClient:HttpClient) { }


  sendEmail(dep:any){
    return this.httpClient.post(`${this.API_URL}/${dep}`,null);

  }
}
