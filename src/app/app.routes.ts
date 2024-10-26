import { Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {AddEventComponent} from "./components/add-event/add-event.component";

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailsComponent},
  { path: 'add', component: AddEventComponent }
];
