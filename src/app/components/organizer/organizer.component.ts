import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CompositeService} from "../../services/composite.service";
import {TimeFormatPipe} from "../utils/time-format-pipe";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
})
export class OrganizerComponent implements OnInit {
  eventList: any[] = [];

  constructor(private compositeService: CompositeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  viewEventAttendees(eventId: number): void {
    this.router.navigate([`/attendees`, eventId]).then(() => {});
  }

  loadEvents(): void {
    let orgId = localStorage.getItem('user_id');
    if (orgId != null){
      this.compositeService.getEventsForOrganiser(orgId).subscribe({
        next: (events) => {
          if (events && events['events']){
            this.eventList = events['events']
          }
        },
        error: (err) => {
          console.error('Error fetching events:', err);
        },
      });
    }
  }

  editEvent(EID: any) {
    this.router.navigate([`/updateEvent`, EID]).then(() => {})
  }
}
