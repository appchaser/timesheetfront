import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activities } from '../model/Activities';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  readonly API_URL="http://localhost:8085/api/activities"
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/text',
    "Access-Control-Allow-Origin": "*",

  })
}
  constructor(private httpClient:HttpClient) { }

  getAllActivities():Observable<Activities[]>{
    return this.httpClient.get<Activities[]>(`${this.API_URL}/getAll`);
  }
  addActivity(data: any){
    return this.httpClient.post<any>(`${this.API_URL}/addActivity`, data);
  }
}
