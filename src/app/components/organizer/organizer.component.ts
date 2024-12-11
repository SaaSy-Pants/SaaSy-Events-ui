import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class OrganizerComponent {
  eventList = [
    {
      id: 1,
      Name: 'Art Exhibition',
      EventCategory: 'Art',
      EventDesc: 'A showcase of contemporary art by local and international artists.',
      Location: 'Art Gallery, City',
      EventDate: '2024-07-10',
      EventTimeStart: '10:00',
      EventTimeEnd: '18:00',
      GuestsRem: 350,
      Price: 50
    },
    {
      id: 2,
      Name: 'Music Festival',
      EventCategory: 'Music',
      EventDesc: 'An outdoor festival featuring various music bands and artists.',
      Location: 'Central Park, City',
      EventDate: '2024-06-20',
      EventTimeStart: '12:00',
      EventTimeEnd: '23:00',
      GuestsRem: 495,
      Price: 80
    },
    {
      id: 3,
      Name: 'Tech Conference 2024',
      EventCategory: 'Technology',
      EventDesc: 'A conference for professionals to discuss the latest in technology.',
      Location: 'Convention Center, City',
      EventDate: '2024-05-15',
      EventTimeStart: '09:00',
      EventTimeEnd: '17:00',
      GuestsRem: 197,
      Price: 150
    }
  ];

  constructor(private router: Router) {}

  viewEventAttendees(eventId: number) {
    this.router.navigate(['/attendees', eventId]);
  }
}
