import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../model/Project';
import { projetdt } from '../board-client/models/projetdt';
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
  getProjectById(id:number):Observable<projetdt>{
    return this.httpClient.get<projetdt>(`${this.API_URL}/getactivity/${id}`);
  }
  addProject(data: any){
    return this.httpClient.post<any>(`${this.API_URL}/addproject`, data);
  }

  afectProjectActivity(idProject: Number , idActivity: Number){
    return this.httpClient.post<any>(`${this.API_URL}/addactivitytoproject/${idProject}/${idActivity}`, null);
  }

  deleteProject(id: number){
    return this.httpClient.delete(`${this.API_URL}/deleteproject/${id}`);
  }

}
