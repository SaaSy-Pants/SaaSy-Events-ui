import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompositeService {
  private baseEventsUrl = 'http://localhost:8001';
  private baseTicketsUrl = 'http://localhost:8002';
  private baseUsersUrl = 'http://localhost:8000';
  private qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code'; // 3rd party api/service for QR Code
  private ticketdetailsUrl = ' http://localhost:4200/booking-confirmation';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseEventsUrl}/events`);
  }

  getBookings(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseTicketsUrl}/ticket?uid=${uid}`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseEventsUrl}/events/${id}`);
  }

  getLoginUrl(type: string) {
    return `${this.baseUsersUrl}/login?profile=${type}`;
  }

  getProfile(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.baseUsersUrl}/user`, { headers });
  }

  createProfile(profileData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(`${this.baseUsersUrl}/user`, profileData, { headers });
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseEventsUrl}/events`, event);
  }

  purchaseTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.baseTicketsUrl}/tickets`, ticket);
  }

  getTicketDetails(ticketId: string): Observable<any> {
    return this.http.get(`${this.baseTicketsUrl}/ticket/${ticketId}`);
  }

  getQrcode(ticketId: string): Observable<Blob> {
    return this.http.get(`${this.qrcodeUrl}/?data=${this.ticketdetailsUrl + "/" + ticketId}`, {responseType: 'blob'});
  }
}
