import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ListingService } from 'src/app/services/listing-service.service';
import { Listing } from 'src/app/models/listing.model';
import { FormsModule } from '@angular/forms';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  private listingsUrl = 'http://localhost:8081/api/listings';

  listings: Listing[] = [];
  offers: any[] = [];
  loading = false;
  modalView: 'DETAIL' | 'OFFER' | 'SUCCESS' = 'DETAIL';
  offerAmount: number | null = null;
  offerMessage = '';

  constructor(
    private listingService: ListingService,
    private offerService: OfferService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings() {
    this.loading = true;

    this.listingService.getAll().subscribe({
      next: (data) => {
        console.log('SHOP LOAD DATA:', data.length);
        this.listings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load listings', err);
        this.loading = false;
      },
    });
  }

  get currentUser() {
    return this.authService.getUser();
  }

  isOwner(): boolean {
    if (!this.currentUser || !this.selectedListing) return false;
    return this.currentUser.id === this.selectedListing.ownerId;
  }

  selectedListing: Listing | null = null;
  showListingModal = false;

  openListing(listing: Listing) {
    this.selectedListing = listing;
    this.showListingModal = true;
    this.modalView = 'DETAIL';

    if (this.isOwner()) {
      this.loadOffers();
    }
  }

  submitOffer() {
    if (!this.selectedListing || !this.offerAmount) return;

    this.offerService
      .createOffer(this.selectedListing.id, this.offerAmount, this.offerMessage)
      .subscribe({
        next: () => {
          this.modalView = 'SUCCESS';
        },
        error: (err) => {
          console.error('Offer failed', err);
        },
      });
  }

  loadOffers() {
    if (!this.selectedListing) return;

    this.offerService.getOffersForListing(this.selectedListing.id).subscribe({
      next: (data) => {
        this.offers = data;
      },
    });
  }

  acceptOffer(offerId: number) {
    if (!this.selectedListing) return;

    this.offerService.acceptOffer(this.selectedListing.id, offerId).subscribe({
      next: () => {
        this.loadOffers(); // refresh
      },
    });
  }
}
