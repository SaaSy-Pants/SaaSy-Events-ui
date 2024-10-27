import { Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'add', component: AddEventComponent }

];
