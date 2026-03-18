import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listing } from 'src/app/models/listing.model';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css'],
})
export class ListingCardComponent {
  @Input() listing!: Listing;
  @Output() select = new EventEmitter<Listing>();

  fallback = 'assets/images/fallback.png';

  onImageError(event: any) {
    event.target.src = this.fallback;
  }
}
