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
  imageIndexes: { [key: number]: number } = {};

  onImageError(event: any) {
    event.target.src = this.fallback;
  }

  getCurrentImage(listing: any): string {
    const index = this.imageIndexes[listing.id] || 0;
    return listing.imageUrls?.[index] || listing.imageUrl || this.fallback;
  }

  next(event: Event, listing: any) {
    event.stopPropagation();

    if (!listing.imageUrls?.length) return;

    const current = this.imageIndexes[listing.id] || 0;
    this.imageIndexes[listing.id] = (current + 1) % listing.imageUrls.length;
  }

  prev(event: Event, listing: any) {
    event.stopPropagation();

    if (!listing.imageUrls?.length) return;

    const current = this.imageIndexes[listing.id] || 0;
    this.imageIndexes[listing.id] =
      (current - 1 + listing.imageUrls.length) % listing.imageUrls.length;
  }
}
