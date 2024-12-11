import { Component, OnInit } from '@angular/core';
import {CompositeService} from "../../services/composite.service";
import {NgIf, NgOptimizedImage} from "@angular/common";

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

  constructor(private compositeService: CompositeService) {}

  ngOnInit(): void {
    this.compositeService.getProfile('user').subscribe({
      next: (profile) => {
        console.log(profile)
        this.user = profile['details'];
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    })
  }
}
