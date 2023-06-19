import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';
import { Clientdto } from '../board-client/models/clientdto';

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

  getClientById(id:number):Observable<Clientdto>{
    return this.httpClient.get<Clientdto>(`${this.API_URL}/project/${id}`);
  }
  afectClientProject(idClient: Number , idProject: Number){
    return this.httpClient.post<any>(`${this.API_URL}/addclienttoproject/${idProject}/${idClient}`, null);
  }
  addClient(name: string){
    return this.httpClient.post<any>(`${this.API_URL}/addClient`, {name});
  }
  deleteClient(id: number){
    return this.httpClient.delete(`${this.API_URL}/deleteClient/${id}`);
  }
}
