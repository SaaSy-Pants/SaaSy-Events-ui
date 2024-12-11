import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AttendeesComponent implements OnInit {
  attendees = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { name: 'Robert Brown', email: 'robertbrown@example.com', phone: '112-233-4455' }
  ];

  eventId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
  }
}
