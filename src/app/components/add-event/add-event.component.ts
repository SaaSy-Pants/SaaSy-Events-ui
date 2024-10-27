import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

}

