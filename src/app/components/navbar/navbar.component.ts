import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, CommonModule, NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showLogout: boolean = true;
  showProfile: boolean = true;
  showCreateAnEvent: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showLogout = this.router.url !== '/login' && this.router.url !== '/signup';
      this.showProfile = !this.router.url.startsWith('/profile');
      this.showCreateAnEvent = this.router.url == '/add';
    });
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login']).then(() => {});
  }

  profile() {
    this.router.navigate(['/profile', localStorage.getItem('profile')]).then(() => {})
  }

  protected readonly localStorage = localStorage;

  createEvent() {
    this.router.navigate(['/add']).then(() => {})
  }
}
