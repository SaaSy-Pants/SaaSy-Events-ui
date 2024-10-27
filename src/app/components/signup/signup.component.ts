import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user.model";
import {firstValueFrom} from "rxjs";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonDirective
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = {
    Name: '',
    Email: '',
    PhoneNo: '',
    HashedPswd: '',
    Address: '',
    Age: 0
  };

  constructor(private http: HttpClient) {}

  async onSignup() {
    const hashedPassword = this.hashPassword(this.user.HashedPswd); // Example password hashing (implement as needed)
    const userPayload = { ...this.user, password: hashedPassword };

    try {
      const response = await firstValueFrom(this.http.post('/api/signup', userPayload));
      alert('Signup successful!');
      // Redirect to login or home page after successful signup
    } catch (error) {
      alert('Signup failed. Please try again.');
    }

  }

  hashPassword(password: string): string {
    // Replace this with your backend's hashing mechanism if required
    return password; // Placeholder; implement secure hashing as needed
  }
}
