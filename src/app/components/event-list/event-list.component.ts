import { Component, OnInit } from '@angular/core';

import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CurrencyPipe
  ]
})
export class EventListComponent implements OnInit {
  eventList: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    console.log('abc');
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.eventList = events;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
