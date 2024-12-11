import { Component, OnInit } from '@angular/core';

import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {CompositeService} from "../../services/composite.service";
import {TimeFormatPipe} from "../utils/time-format-pipe";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CurrencyPipe,
    TimeFormatPipe
  ]
})
export class EventListComponent implements OnInit {
  eventList: any[] = [];

  constructor(private compositeService: CompositeService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.compositeService.getEvents().subscribe({
      next: (events) => {
        if (events && events.result){
          this.eventList = events.result.data
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
