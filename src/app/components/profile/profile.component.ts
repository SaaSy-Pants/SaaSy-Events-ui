import { Component, OnInit } from '@angular/core';
import {CompositeService} from "../../services/composite.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private compositeService: CompositeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.compositeService.getProfile(params['role']).subscribe({
        next: (profile) => {
          this.user = profile['data']['details'];
        },
        error: (err) => {
          console.error('Error fetching events:', err);
        },
      })
    });
  }
}
