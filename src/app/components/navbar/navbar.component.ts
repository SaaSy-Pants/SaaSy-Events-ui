import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showUserOptions:boolean = false;

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }
}
