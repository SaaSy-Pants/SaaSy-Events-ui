import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import {CompositeService} from "../../services/composite.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AttendeesComponent implements OnInit {
  attendees: any[] = []

  constructor(private route: ActivatedRoute, private compositeService: CompositeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.compositeService.getAttendees(params['eventId']).subscribe({
        next: (attendees) => {
          const attendeeRequest = attendees['uids'].map(async (attendee: { UID: string; }) =>  {
            const attendeeObject = await firstValueFrom(this.compositeService.getProfileById('user', attendee['UID']));
            return attendeeObject['details']
          });

          Promise.all(attendeeRequest)
              .then(attendeeDetails => {
                this.attendees = attendeeDetails.sort((a, b) => {
                  return a.Name - b.Name;
                });
              })
              .catch(err => {
                console.error('Error fetching event details:', err);
              });
        },
        error: (err) => {
          console.error('Error fetching events:', err);
        },
      })
    });
  }
}
