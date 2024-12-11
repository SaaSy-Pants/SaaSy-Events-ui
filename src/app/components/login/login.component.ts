import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabViewModule} from "primeng/tabview";
import {PasswordModule} from "primeng/password";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CompositeService} from "../../services/composite.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    TabViewModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonDirective,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  role: string = 'user'

  constructor(private compositeService: CompositeService) {}

  onRoleChange(role: string) {
    this.role = role
  }

  signInWithGoogle() {
    window.location.href = this.compositeService.getLoginUrl(this.role);
  }
}
