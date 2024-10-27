import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonDirective,
    CardModule,
    TabViewModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  onSignup() {

  }
}
