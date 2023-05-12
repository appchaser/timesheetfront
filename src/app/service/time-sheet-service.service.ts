import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSheet } from '../model/timesheetModel';
@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
readonly API_URL="http://localhost:8085/api/timesheets"
httpOptions = {
  headers: new HttpHeaders({

    "Access-Control-Allow-Origin": "*",

  })
}
  constructor(private httpClient:HttpClient) { }

  getAllTimeSheets():Observable<TimeSheet[]>{
    return this.httpClient.get<TimeSheet[]>(`${this.API_URL}/all`);
  }
  getbyId(id:any):Observable<any>{
    return this.httpClient.get<any>(`${this.API_URL}/${id}`);
  }
  addTimeSheet(timesheet:TimeSheet, projectId: any, idUser:any, idActivity:any, idClient: any){
    return this.httpClient.post(`${this.API_URL}/addtimeSheet/${projectId}/${idUser}/${idActivity}/${idClient}`,timesheet)
  }
  updateTimeSheet(timesheet:TimeSheet){
    return this.httpClient.put(`${this.API_URL}/updatetimesheet`,timesheet);
  }
  deleteTimeSheet(timesheet:TimeSheet){
    return this.httpClient.delete(`${this.API_URL}/timeshhet/${timesheet.id}`);
  }
  addUserToTimeSheet(idtimesheet:any,idUser:any){
    return this.httpClient.post(`${this.API_URL}/adduserToTimesheet/${idUser}/${idtimesheet}`,null,this.httpOptions);
  }
  addProjectToTimeSheet(idProject:any,idtimesheet:any){
    return this.httpClient.post(`${this.API_URL}/addProjectToTimesheet/${idProject}/${idtimesheet}`,null,this.httpOptions);
  }

}
