import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CompositeService} from "../../services/composite.service";
import {DurationToTimePipe} from "../utils/duration-to-time-pipe";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  standalone: true,
  imports: [CommonModule, DurationToTimePipe],
})
export class EventDetailsComponent implements OnInit {
    event: any = null;
    ticketsToBuy = 1;
    organiser: any = null;

    constructor(private route: ActivatedRoute, private router: Router, private compositeService: CompositeService) {}

    ngOnInit() {
        const eventId = this.route.snapshot.paramMap.get('id');
        if (eventId) {
            this.compositeService.getEventById(eventId).subscribe({
              next: (data) => {
                // Map the API response to the expected fields
                this.event = {
                  id: data.EID,
                  name: data.Name,
                  category: data.EventCategory,
                  description: data.EventDesc,
                  location: data.Location,
                  date: data.EventDate,
                  timeStart: data.EventTimeStart,
                  timeEnd: data.EventTimeEnd,
                  ticketsAvailable: data.GuestsRem,
                  price: data.Price,
                  maxGuestsPerTicket: data.MaxGuestsPerTicket,
                };

                this.compositeService.getProfileById('organiser', data.OID).subscribe({
                  next: (organiser) => {
                    organiser = organiser.details
                    this.organiser = {
                      name: organiser.Name,
                      email: organiser.Email,
                      phone: organiser.PhoneNo,
                    }
                  }
                })
              },
              error: (err) => console.error('Error fetching event details:', err),
            });
        }
    }

  increaseTickets() {
    if (this.ticketsToBuy < this.event.maxGuestsPerTicket) {
      this.ticketsToBuy++;
    }
  }

  decreaseTickets() {
    if (this.ticketsToBuy > 1) {
      this.ticketsToBuy--;
    }
  }

  bookNow() {
    const ticket = {
      uid: localStorage.getItem('user_id'),
      eid: this.event.id,
      num_guests: this.ticketsToBuy,
    };

    this.compositeService.purchaseTicket(ticket).subscribe({
      next: (response) => {
        console.log('Ticket purchase successful:', response);
        this.router.navigate([`/booking-confirmation`, response['TID']]).then(() => {})
      },
      error: (err) => {
        console.error('Error purchasing ticket:', err);
        alert('Error purchasing ticket !!');
      },
    });
  }
}
