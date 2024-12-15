import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompositeService {
  private baseCompositeUrl = 'http://localhost:8003/composite';
  private qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code'; // 3rd party api/service for QR Code

  constructor(private http: HttpClient) {}

  getToken() {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseCompositeUrl}/events`, { headers: this.getToken() });
  }

  getBookings(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseCompositeUrl}/ticket/user/${uid}`, { headers: this.getToken() });
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseCompositeUrl}/events/${id}`, { headers: this.getToken() });
  }

  getEventsForOrganiser(orgId: string): Observable<any> {
    return this.http.get<any>(`${this.baseCompositeUrl}/events/organiser/${orgId}`, { headers: this.getToken() });
  }

  getLoginUrl(type: string) {
    return `${'http://localhost:8000'}/login?profile=${type}`;
  }

  getProfile(role: string): Observable<any> {
    return this.http.get(`${this.baseCompositeUrl}/${role}`, { headers: this.getToken() });
  }

  getProfileById(role: string, id: string): Observable<any> {
    return this.http.get(`${this.baseCompositeUrl}/${role}/${id}`, { headers: this.getToken() });
  }

  createProfile(profileData: any, role: string): Observable<any> {
    return this.http.post(`${this.baseCompositeUrl}/${role}`, profileData, { headers: this.getToken() });
  }

  getAttendees(eid: string): Observable<any> {
    return this.http.get(`${this.baseCompositeUrl}/ticket/event/${eid}/users`, { headers: this.getToken() });
  }

  addEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.baseCompositeUrl}/events`, event, { headers: this.getToken() });
  }

  updateEvent(event: any): Observable<any> {
    return this.http.put<any>(`${this.baseCompositeUrl}/events`, event, { headers: this.getToken() });
  }

  updateGuests(eid: string, guest: number): Observable<any> {
    return this.http.patch<any>(`${this.baseCompositeUrl}/events/${eid}/${guest}`, {}, { headers: this.getToken() });
  }

  purchaseTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.baseCompositeUrl}/ticket`, ticket, { headers: this.getToken() });
  }

  getTicketDetails(ticketId: string): Observable<any> {
    return this.http.get(`${this.baseCompositeUrl}/ticket/${ticketId}`, { headers: this.getToken() });
  }

  getQrcode(ticketId: string): Observable<Blob> {
    return this.http.get(`${this.qrcodeUrl}/?data=${ticketId}`, {responseType: 'blob'});
  }
}
