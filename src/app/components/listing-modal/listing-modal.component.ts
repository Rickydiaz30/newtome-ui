import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listing } from 'src/app/models/listing.model';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { APP_CONSTANTS } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-listing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './listing-modal.component.html',
})
export class ListingModalComponent {
  @Input() listing!: Listing | null;
  @Input() show = false;
  @Input() loading = false;
  @Input() modalView!: 'DETAIL' | 'OFFER' | 'SUCCESS';
  @Input() offerAmount!: number | null;
  @Input() offerMessage!: string;
  @Input() isOwner!: boolean;

  @Output() close = new EventEmitter<void>();
  @Output() makeOffer = new EventEmitter<void>();
  @Output() submitOffer = new EventEmitter<{
    amount: number | null;
    message: string;
  }>();
  @Output() back = new EventEmitter<void>();

  currentImageIndex = 0;
  fallback = APP_CONSTANTS.FALLBACK_IMAGE;

  ngOnChanges() {
    this.currentImageIndex = 0;
  }

  nextImage() {
    if (!this.listing?.imageUrls?.length) return;

    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.listing.imageUrls.length;
  }

  prevImage() {
    if (!this.listing?.imageUrls?.length) return;

    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.listing.imageUrls.length) %
      this.listing.imageUrls.length;
  }

  get images(): string[] {
    if (!this.listing) return ['assets/images/fallback.png'];

    const cdnBase = 'https://d3qyvu5wcarbxw.cloudfront.net';

    // Case 1: already full URL (BEST case)
    if (this.listing.imageUrl?.startsWith('http')) {
      return [this.listing.imageUrl];
    }

    // Case 2: stored as key (listings/file.webp)
    if (this.listing.imageUrl) {
      return [`${cdnBase}/${this.listing.imageUrl}`];
    }

    return ['assets/images/fallback.png'];
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.fallback;
  }
}
