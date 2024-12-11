import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = 'http://localhost:8002/ticket';
  private qrcodeUrl = 'https://api.qrserver.com/v1/create-qr-code' // 3rd party api/service for QR Code
  private ticketdetailsUrl = ' http://localhost:8008/booking-confirmation'
  constructor(private http: HttpClient) {}

  getTicketDetails(ticketId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ticketId}`);
  }

  getQrcode(ticketId: string): Observable<Blob> {
    return this.http.get(`${this.qrcodeUrl}/?data=${this.ticketdetailsUrl + "/" + ticketId}`, {responseType: 'blob'});
  }
}
