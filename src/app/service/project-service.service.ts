import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/Project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly API_URL="http://localhost:8085/api/projects"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }
  constructor(private httpClient:HttpClient) { }
  getAllProject():Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.API_URL}/all`);
  }
}
