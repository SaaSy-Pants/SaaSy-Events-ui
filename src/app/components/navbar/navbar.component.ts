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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showLogout = this.router.url !== '/login' && this.router.url !== '/signup';
    });

    this.router.events.subscribe(() => {
      this.showProfile = this.router.url !== '/profile';
    });
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login']).then(() => {});
  }

  profile() {
    this.router.navigate(['/profile', localStorage.getItem('profile')]).then(() => {})
  }
}
