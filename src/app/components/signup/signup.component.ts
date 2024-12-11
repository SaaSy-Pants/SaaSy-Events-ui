import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {CompositeService} from "../../services/composite.service";
import {Router} from "@angular/router";

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

  constructor(private compositeService: CompositeService, private router: Router) {}

  onSignup(signupForm: any): void {
    if (signupForm.valid) {
      const formValues = signupForm.value;
      const phoneNo = formValues.phoneNo;
      const address = formValues.address;
      const age = formValues.age;

      this.compositeService.createProfile(
        {'PhoneNo': phoneNo, 'Address': address, 'Age': age}
      ).subscribe(user => {
        localStorage.setItem('user_id', user.UID)
        this.router.navigate(['/dashboard']).then(() => {});
      })
    }
  }
}
