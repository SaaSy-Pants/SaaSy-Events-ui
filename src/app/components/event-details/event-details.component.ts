import { Component } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  standalone: true,
})
export class EventDetailsComponent {
  event = {
    id: 1,
    name: 'Music Fest 2024',
    category: 'Concert',
    description: 'Experience the best music performances by top artists.',
    location: 'Central Park, New York',
    date: '2024-12-20',
    timeStart: '18:00',
    timeEnd: '23:00',
    ticketsAvailable: 100,
    price: 50,
};

  ticketsToBuy = 1;

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