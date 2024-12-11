import {Component, OnInit} from '@angular/core';
import {EventListComponent} from "../event-list/event-list.component";
import {UpcomingBookingsComponent} from "../upcoming-bookings/upcoming-bookings.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CompositeService} from "../../services/composite.service";
import {catchError, of} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    EventListComponent,
    UpcomingBookingsComponent,
    NgIf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  isProfileLoaded = false;

  constructor(private route: ActivatedRoute, private compositeService: CompositeService, private router: Router) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      const params: any = {};
      let refreshToken;
      let accessToken;

      if (fragment) {
        const pairs = fragment.split('#');
        pairs.forEach(pair => {
          const [key, value] = pair.split('=');
          params[key] = decodeURIComponent(value);
        });

        accessToken = params['access_token'];
        refreshToken = params['refresh_token'];

        if (accessToken && refreshToken) {
          this.storeTokens(accessToken, refreshToken);
        }

        this.compositeService.getProfile().pipe(
          catchError((error) => {
            if (error.status === 404) {
              this.router.navigate(['/signup']).then(_ => {})
            }
            return of(null);
          })
        ).subscribe(profile => {
          if (profile) {
            localStorage.setItem("user_id", profile['details']['UID']);
            this.isProfileLoaded = true;
          }
        });
      }
    });
  }

  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
}
