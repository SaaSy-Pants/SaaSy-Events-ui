import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/events`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}`);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/events`, event);
  }

  purchaseTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tickets`, ticket);
  }
}
