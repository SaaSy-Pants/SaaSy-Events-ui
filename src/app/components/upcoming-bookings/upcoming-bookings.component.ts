import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {CompositeService} from "../../services/composite.service";
import {firstValueFrom} from "rxjs";
import {DurationToTimePipe} from "../utils/duration-to-time-pipe";
import {Router} from "@angular/router";

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

  constructor(private compositeService: CompositeService, private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  navigateToEvent(tid: number): void {
    this.router.navigate([`/booking-confirmation`, tid]).then(() => {});
  }

  loadBookings() {
    let userId = localStorage.getItem("user_id")
    if (userId != null) {
      this.compositeService.getBookings(userId).subscribe({
        next: (bookings) => {
          if (bookings && bookings.tickets) {
            const eventRequests = bookings.tickets.map(async (ticket: { TID: string, EID: string }) => {
              const event = await firstValueFrom(this.compositeService.getEventById(ticket['EID']));
              return {...event, TID: ticket.TID};
            });

            Promise.all(eventRequests)
              .then(events => {
                this.bookingList = events.sort((a, b) => {
                  const dateTimeA = new Date(`${a.EventDate}`).getTime() + this.parsePTDuration(a.EventTimeStart);
                  const dateTimeB = new Date(`${b.EventDate}`).getTime() + this.parsePTDuration(b.EventTimeStart);
                  return dateTimeA - dateTimeB;
                });
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

  parsePTDuration(ptTime: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = ptTime.match(regex);

    if (!match) {
      console.warn(`Invalid PT format: ${ptTime}`);
      return 0;
    }

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }
}
