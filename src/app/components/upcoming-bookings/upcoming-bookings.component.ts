import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {CompositeService} from "../../services/composite.service";
import {firstValueFrom} from "rxjs";
import {DurationToTimePipe} from "../utils/duration-to-time-pipe";

@Component({
  selector: 'app-upcoming-bookings',
  standalone: true,
  templateUrl: './upcoming-bookings.component.html',
  imports: [
    DatePipe,
    DurationToTimePipe,
    NgForOf
  ],
  styleUrl: './upcoming-bookings.component.css'
})
export class UpcomingBookingsComponent implements OnInit {
  bookingList: any[] = [];

  constructor(private compositeService: CompositeService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.compositeService.getBookings('U001').subscribe({
      next: (bookings) => {
        if (bookings && bookings.tickets){
          const eventRequests = bookings.tickets.map(async (ticket: { EID: string }) =>
            await firstValueFrom(this.compositeService.getEventById(ticket['EID']))
          );

          Promise.all(eventRequests)
            .then(events => {
              console.log(events)
              this.bookingList = events;
            })
            .catch(err => {
              console.error('Error fetching event details:', err);
            });
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
