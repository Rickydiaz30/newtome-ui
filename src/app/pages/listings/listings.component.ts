import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListingService } from 'src/app/services/listing-service.service';
import { Listing } from 'src/app/models/listing.model';
import { FormsModule } from '@angular/forms';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './listings.component.html',
})
export class ListingsComponent implements OnInit {
  listings: Listing[] = [];
  offers: any[] = [];
  loading = false;

  modalView: 'DETAIL' | 'OFFER' | 'SUCCESS' = 'DETAIL';

  offerAmount: number | null = null;
  offerMessage = '';

  searchQuery: string = '';
  searchTimeout: any;

  selectedListing: Listing | null = null;
  showListingModal = false;

  redirectListingId: number | null = null;

  constructor(
    private listingService: ListingService,
    private offerService: OfferService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Check query params first
    this.route.queryParams.subscribe((params) => {
      if (params['redirect'] === 'offer' && params['listingId']) {
        this.redirectListingId = Number(params['listingId']);
      }
    });

    // Load listings
    this.loadListings();
  }

  loadListings() {
    this.loading = true;

    this.listingService.getAll().subscribe({
      next: (data) => {
        console.log('SHOP LOAD DATA:', data.length);

        this.listings = data;
        this.loading = false;

        // Handle redirect after listings load
        if (this.redirectListingId) {
          const listing = this.listings.find(
            (l) => l.id === this.redirectListingId,
          );

          if (listing) {
            this.selectedListing = listing;
            this.showListingModal = true;
            this.modalView = 'OFFER';
          }

          this.redirectListingId = null;
        }
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

  searchListings() {
    if (!this.searchQuery.trim()) {
      this.loadListings();
      return;
    }

    this.listingService.search(this.searchQuery).subscribe({
      next: (data) => {
        this.listings = data;
      },

      error: (err) => {
        console.error('Search failed', err);
      },
    });
  }

  onSearchChange(value: string) {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.searchListings();
    }, 300);
  }

  isOwner(): boolean {
    if (!this.currentUser || !this.selectedListing) return false;

    return this.currentUser.id === this.selectedListing.ownerId;
  }

  openListing(listing: Listing) {
    this.selectedListing = listing;
    this.showListingModal = true;
    this.modalView = 'DETAIL';

    if (this.isOwner()) {
      this.loadOffers();
    }
  }

  handleOfferClick() {
    if (!this.currentUser) {
      this.router.navigate(['/login'], {
        queryParams: {
          redirect: 'offer',
          listingId: this.selectedListing?.id,
        },
      });

      return;
    }

    this.modalView = 'OFFER';
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
        this.loadOffers();
      },
    });
  }
}
