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

  getEventsForOrganiser(orgId: string): Observable<any> {
    return this.http.get<any>(`${this.baseEventsUrl}/events/organizer/${orgId}`);
  }

  getLoginUrl(type: string) {
    return `${this.baseUsersUrl}/login?profile=${type}`;
  }

  getProfile(role: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.baseUsersUrl}/${role}`, { headers });
  }

  getProfileById(role: string, id: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.baseUsersUrl}/${role}/${id}`, { headers });
  }

  createProfile(profileData: any, role: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(`${this.baseUsersUrl}/${role}`, profileData, { headers });
  }

  getAttendees(eid: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.baseTicketsUrl}/ticket/event/${eid}/users`, { headers });
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseEventsUrl}/events`, event);
  }

  updateGuests(eid: string, guest: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.patch<any>(`${this.baseEventsUrl}/events/${eid}/${guest}`, { headers });
  }

  purchaseTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.baseTicketsUrl}/ticket`, ticket);
  }

  getTicketDetails(ticketId: string): Observable<any> {
    return this.http.get(`${this.baseTicketsUrl}/ticket/${ticketId}`);
  }

  getQrcode(ticketId: string): Observable<Blob> {
    return this.http.get(`${this.qrcodeUrl}/?data=${ticketId}`, {responseType: 'blob'});
  }
}
