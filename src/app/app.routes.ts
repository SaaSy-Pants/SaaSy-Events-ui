import { Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UpcomingBookingsComponent} from "./components/upcoming-bookings/upcoming-bookings.component";

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventListComponent },
  {path: 'upcomingBookings', component: UpcomingBookingsComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'add', component: AddEventComponent }

];