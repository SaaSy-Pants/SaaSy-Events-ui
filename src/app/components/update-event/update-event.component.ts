import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CompositeService} from "../../services/composite.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  eventId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private service: CompositeService
  ) {
    this.eventForm = this.fb.group({
      Name: ['', Validators.required],
      EventCategory: ['', Validators.required],
      EventDesc: ['', Validators.required],
      Location: ['', Validators.required],
      EventDate: ['', Validators.required],
      EventTimeStart: ['', Validators.required],
      EventTimeEnd: ['', Validators.required],
      MaxGuestsPerTicket: ['', [Validators.required, Validators.min(1)]],
      TicketsAvb: ['', [Validators.required, Validators.min(1)]],
      Price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.loadEventData();
  }

  convertDurationFormat(startTime: string, duration: string): string {
    const regex = /^PT(\d+H)?(\d+M)?$/;
    const match = duration.match(regex);

    if (match) {
      const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
      const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;

      const [startHour, startMinute] = startTime.split(':').map(Number);

      let endHour = startHour + hours;
      let endMinute = startMinute + minutes;

      if (endMinute >= 60) {
        endMinute -= 60;
        endHour += 1;
      }

      const formattedHour = endHour < 10 ? '0' + endHour : endHour.toString();
      const formattedMinute = endMinute < 10 ? '0' + endMinute : endMinute.toString();

      return `${formattedHour}:${formattedMinute}`;
    }

    return 'Invalid duration format';
  }


  loadEventData(): void {
    if (this.eventId && this.eventId !== '') {
      this.service.getEventById(this.eventId).subscribe({
        next: (eventData) => {
          eventData = eventData['data']
          this.eventForm.patchValue({
            Name: eventData.Name,
            EventCategory: eventData.EventCategory,
            EventDesc: eventData.EventDesc,
            Location: eventData.Location,
            EventDate: eventData.EventDate,
            EventTimeStart: this.convertDurationFormat('00:00', eventData.EventTimeStart),
            EventTimeEnd: this.convertDurationFormat('00:00', eventData.EventTimeEnd),
            MaxGuestsPerTicket: eventData.MaxGuestsPerTicket,
            TicketsAvb: eventData.GuestsRem,
            Price: eventData.Price
          });
        },
        error: (error) => {
          console.error('Error loading event data:', error);
          alert('Failed to load event data. Please try again.');
        }
      });
    }
  }

  onUpdate(): void {
    if (this.eventForm.valid) {
      const formValues = this.eventForm.value;
      const name = formValues.Name;
      const category = formValues.EventCategory;
      const desc = formValues.EventDesc;
      const date = formValues.EventDate;
      const location = formValues.Location;
      const eventTimeStart = formValues.EventTimeStart;
      const eventTimeEnd = formValues.EventTimeEnd;
      const ticketsAvb = formValues.TicketsAvb;
      const maxGuestsPerTicket = formValues.MaxGuestsPerTicket;
      const price = formValues.Price;

      this.service.updateEvent(
        {'EID': this.eventId, 'OID': localStorage.getItem('user_id'), 'Name': name, 'EventCategory': category, 'EventDesc': desc, 'EventDate': date, 'Location': location, 'EventTimeStart': eventTimeStart,
          'EventTimeEnd': eventTimeEnd, 'GuestsRem': ticketsAvb, "MaxGuestsPerTicket": maxGuestsPerTicket, "Price": price}
      ).subscribe(resp => {
        if ('EID' in resp['data']) {
          confirm('Event Updated Successfully');
          this.location.back();
        } else {
          alert('Failed :(');
        }
      })
    }
  }
}
