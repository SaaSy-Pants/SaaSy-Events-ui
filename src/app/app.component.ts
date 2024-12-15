import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AddEventComponent} from "./components/add-event/add-event.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {EventListComponent} from "./components/event-list/event-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {UpdateEventComponent} from "./components/update-event/update-event.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet, AddEventComponent, EventDetailsComponent, EventListComponent, NavbarComponent, BookingConfirmationComponent,
    ProfileComponent, UpdateEventComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SaaS-y Events';
}
