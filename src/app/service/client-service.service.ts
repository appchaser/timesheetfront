import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService{
  readonly API_URL="http://localhost:8085/api/clients"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/text',
      "Access-Control-Allow-Origin": "*",

    })
  }

  constructor(private httpClient:HttpClient) { }
  getAllClient():Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.API_URL}/getAll`);
  }
}
