import { Routes } from '@angular/router';
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { AttendeesComponent } from "./components/attendees/attendees.component";
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {UpdateEventComponent} from "./components/update-event/update-event.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup/:role', component: SignupComponent },
  { path: 'dashboard/:role', component: DashboardComponent },
  { path: 'attendees/:eventId', component: AttendeesComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'add', component: AddEventComponent },
  { path: 'booking-confirmation/:ticketId', component: BookingConfirmationComponent },
  { path: 'profile/:role', component: ProfileComponent },
  { path: 'updateEvent/:eventId', component: UpdateEventComponent }
];
