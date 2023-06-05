import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullCalendarService {
  private baseUrl='http://localhost:3000'

  constructor(private http:HttpClient) { }

  getEvents(){
    return this.http.get(this.baseUrl+'/events')
  }
  addEvent(event:any){
    return this.http.post(this.baseUrl+'/events',event)
  }
}
