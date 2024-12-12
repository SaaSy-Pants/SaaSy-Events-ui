import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CompositeService} from "../../services/composite.service";
import {Router} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import { Location } from '@angular/common';

function generateUUID() {
  return crypto.randomUUID();
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonDirective
  ],
  styleUrl: './add-event.component.css'
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.eventForm = this.fb.group({
      Name: ['', Validators.required],
      EventCategory: ['', Validators.required],
      EventDesc: ['', Validators.required],
      Location: ['', Validators.required],
      EventDate: ['', Validators.required],
      EventTimeStart: ['', Validators.required],
      EventTimeEnd: ['', Validators.required],
      MaxGuestsPerTicket: ['', Validators.required],
      TicketsAvb: ['', Validators.required],
      Price: ['', Validators.required]
    });
  }

  constructor(private compositeService: CompositeService, private fb: FormBuilder, private location: Location) {}

  onCreate(): void {
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

      this.compositeService.addEvent(
        {'EID': generateUUID(), 'OID': localStorage.getItem('user_id'), 'Name': name, 'EventCategory': category, 'EventDesc': desc, 'EventDate': date, 'Location': location, 'EventTimeStart': eventTimeStart,
        'EventTimeEnd': eventTimeEnd, 'GuestsRem': ticketsAvb, "MaxGuestsPerTicket": maxGuestsPerTicket, "Price": price}
      ).subscribe(resp => {
        if ('EID' in resp) {
          confirm('Event Created Successfully');
          this.location.back();
        } else {
          alert('Failed :(');
        }
      })
    }
  }

}

