import { Component } from '@angular/core';
import {EventListComponent} from "../event-list/event-list.component";
import {UpcomingBookingsComponent} from "../upcoming-bookings/upcoming-bookings.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    EventListComponent,
    UpcomingBookingsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
