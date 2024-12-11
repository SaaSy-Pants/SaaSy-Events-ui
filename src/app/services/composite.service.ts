import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompositeService {
  private baseEventsUrl = 'http://localhost:8001';
  private baseTicketsUrl = 'http://localhost:8002';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseEventsUrl}/events`);
  }

  getBookings(uid: String): Observable<any> {
    return this.http.get<any>(`${this.baseTicketsUrl}/ticket?uid=${uid}`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseEventsUrl}/events/${id}`);
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseEventsUrl}/events`, event);
  }

  purchaseTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.baseTicketsUrl}/tickets`, ticket);
  }
}
