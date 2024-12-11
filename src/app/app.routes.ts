import { Routes } from '@angular/router';
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'add', component: AddEventComponent },
  { path: 'booking-confirmation/:ticketId', component: BookingConfirmationComponent }
];
