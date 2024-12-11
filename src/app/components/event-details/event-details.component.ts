import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CompositeService} from "../../services/composite.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class EventDetailsComponent implements OnInit {
    event: any = null;
    ticketsToBuy = 1;

    constructor(private route: ActivatedRoute, private compositeService: CompositeService) {}

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
                };
              },
              error: (err) => console.error('Error fetching event details:', err),
            });
        }
    }

  increaseTickets() {
    if (this.ticketsToBuy < this.event.ticketsAvailable) {
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
      eventId: this.event.id,
      tickets: this.ticketsToBuy,
      totalPrice: this.ticketsToBuy * this.event.price,
    };

    console.log('Ticket created:', ticket);
    // alert('Tickets successfully booked!');
  }
}
