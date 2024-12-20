import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompositeService } from "../../services/composite.service";
import {DatePipe} from "@angular/common";
import {TimeFormatPipe} from "../utils/time-format-pipe";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
  standalone: true,
  imports: [
    NgIf,
    TimeFormatPipe,
    DatePipe,
  ]
})
export class BookingConfirmationComponent implements OnInit {
  ticketId: string = '';
  eventId: string = '';
  qrcodeImageUrl: string = '';
  ticketDetails: any = {};
  eventDetails: any = {};
  eventStartTime: string = '';
  eventEndTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private compService: CompositeService,
  ) {}

  ngOnInit(): void {
    // Get ticket ID from route parameters
    this.ticketId = this.route.snapshot.paramMap.get('ticketId') || '';

    // Fetch ticket details, barcode, and QR code
    this.getTicketDetails();
    this.getQrcode();
  }

  getTicketDetails(): void {
    this.compService.getTicketDetails(this.ticketId).subscribe({
      next: (details: any) => {
        details = details['data']
        this.ticketDetails = details; // Handle the ticket details
        this.eventId = details.EID;

        // Ensure we have the event ID before calling getEventDetails
        if (this.eventId) {
          this.getEventDetails();
        } else {
          console.error('Event ID is missing');
        }
      },
      error: (error) => console.error('Error fetching ticket details:', error),
    });
  }

  getEventDetails(): void {
    this.compService.getEventById(this.eventId).subscribe({
      next: (details: any) => {
        // Convert the duration format to a time string
        details = details['data']
        this.eventStartTime = this.convertDurationToTime(details.EventTimeStart);
        this.eventEndTime = this.convertDurationToTime(details.EventTimeEnd);

        this.eventDetails = details; // Handle the event details
      },
      error: (error) => console.error('Error fetching event details:', error),
    });
  }

  getQrcode(): void {
    this.compService.getQrcode(this.ticketId).subscribe({
      next: (qrcodeBlob: Blob) => {
        this.qrcodeImageUrl = URL.createObjectURL(qrcodeBlob); // Convert Blob to URL
      },
      error: (error) => console.error('Error fetching QR code:', error),
    });
  }

  convertDurationToTime(duration: string): string {
    const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
    if (match) {
      const hours = match[1] ? parseInt(match[1], 10) : 0;
      const minutes = match[2] ? parseInt(match[2], 10) : 0;

      const hoursString = hours < 10 ? '0' + hours : hours.toString();
      const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();

      return `${hoursString}:${minutesString}`;
    }
    return 'Invalid time';
  }
}
