import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {CompositeService} from "../../services/composite.service";
import {ActivatedRoute, Router} from "@angular/router";

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
export class SignupComponent implements OnInit {

  profile = 'user';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profile = params['role'];
    });
  }

  constructor(private compositeService: CompositeService, private router: Router, private route: ActivatedRoute) {}

  onSignup(signupForm: any): void {
    if (signupForm.valid) {
      const formValues = signupForm.value;
      const phoneNo = formValues.phoneNo;
      const address = formValues.address;
      const age = formValues.age;

      this.compositeService.createProfile(
        {'PhoneNo': phoneNo, 'Address': address, 'Age': age}, this.profile
      ).subscribe(user => {
        user = user['data']
        if (this.profile == 'user')
          localStorage.setItem('user_id', user.UID)
        else
          localStorage.setItem('user_id', user.OID)
        localStorage.setItem('email', user.Email);
        this.router.navigate(['/dashboard', this.profile]).then(() => {});
      })
    }
  }
}
