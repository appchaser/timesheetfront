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
    'Content-Type': 'application/text',
    "Access-Control-Allow-Origin": "*",

  })
}
  constructor(private httpClient:HttpClient) { }

  getAllTimeSheets():Observable<TimeSheet[]>{
    return this.httpClient.get<TimeSheet[]>(`${this.API_URL}/all`);
  }
  getbyId(id:any):Observable<TimeSheet>{
    return this.httpClient.get<TimeSheet>(`${this.API_URL}/${id}`);
  }
  addTimeSheet(timesheet:TimeSheet){
    return this.httpClient.post(`${this.API_URL}/addtimeSheet`,timesheet)
  }
  updateTimeSheet(timesheet:TimeSheet){
    return this.httpClient.put(`${this.API_URL}/updatetimesheet`,timesheet);
  }
  deleteTimeSheet(timesheet:TimeSheet){
    return this.httpClient.delete(`${this.API_URL}/deletetimesheet/${timesheet.id}`);
  }

}
