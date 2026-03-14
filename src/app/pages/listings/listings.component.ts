import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListingService } from 'src/app/services/listing-service';
import { Listing } from 'src/app/models/listing.model';
import { FormsModule } from '@angular/forms';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, SpinnerComponent],
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
    this.route.queryParams.subscribe((params) => {
      if (params['redirect'] === 'offer' && params['listingId']) {
        this.redirectListingId = Number(params['listingId']);
      }
    });

    this.loadListings();
  }

  loadListings() {
    this.loading = true;

    this.listingService.getAll().subscribe({
      next: (listings: Listing[]) => {
        this.listings = listings ?? [];
        this.loading = false;

        if (this.redirectListingId) {
          const listing = this.listings.find(
            (l) => l.id === this.redirectListingId,
          );

          if (listing) {
            // If user owns listing → do nothing
            if (this.currentUser?.id === listing.ownerId) {
              this.redirectListingId = null;
              return;
            }

            // Otherwise reopen offer modal
            this.openListing(listing);
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
    const query = this.searchQuery.trim();

    if (!query) {
      this.loadListings();
      return;
    }

    this.listingService.search(query).subscribe({
      next: (listings) => {
        console.log('SEARCH RESULTS:', listings);

        this.listings = listings;
      },
      error: (err) => {
        console.error('Search failed', err);
      },
    });
  }

  onSearchChange() {
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

    this.offerAmount = null;
    this.offerMessage = '';

    this.modalView = 'OFFER';
  }

  submitOffer() {
    if (!this.selectedListing || !this.offerAmount) return;

    this.loading = true;

    this.offerService
      .createOffer(this.selectedListing.id, this.offerAmount, this.offerMessage)
      .subscribe({
        next: () => {
          this.loading = false;
          this.modalView = 'SUCCESS';
          this.searchQuery = '';

          this.offerAmount = null;
          this.offerMessage = '';
        },

        error: (err) => {
          console.error('Offer failed', err);
          this.loading = false;
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
