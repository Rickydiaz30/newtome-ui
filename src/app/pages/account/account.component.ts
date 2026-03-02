import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing-service.service';
import { Listing } from '../../models/listing.model';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';

type MeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  imports: [CommonModule, RouterLink],
})
export class AccountComponent implements OnInit {
  user: MeResponse | null = null;
  loading = false;
  error: string | null = null;
  myListings: Listing[] = [];
  myOffers: Offer[] = [];
  loadingOffers = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private offerService: OfferService,
    private listingService: ListingService, // 👈 add this
  ) {}

  ngOnInit(): void {
    this.loadMe();
    this.loadMyListings();
    this.loadMyOffers();
  }

  loadMe() {
    this.loading = true;
    this.error = null;

    // Your interceptor should attach Bearer token automatically
    this.http.get<MeResponse>('http://localhost:8081/api/users/me').subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load account.';
      },
    });
  }

  loadMyListings() {
    this.listingService.getMyListings().subscribe({
      next: (listings) => {
        this.myListings = listings;
      },
      error: () => {
        console.error('Failed to load listings');
      },
    });
  }

  loadMyOffers() {
    this.loadingOffers = true;

    this.offerService.getMyOffers().subscribe({
      next: (offers) => {
        this.myOffers = offers;
        this.loadingOffers = false;
      },
      error: () => {
        this.loadingOffers = false;
      },
    });
  }

  // Delete listing with confirmation
  deleteListing(id: number) {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    this.listingService.deleteListing(id).subscribe({
      next: () => {
        // remove from UI immediately
        this.myListings = this.myListings.filter((l) => l.id !== id);
      },
      error: () => {
        alert('Failed to delete listing.');
      },
    });
  }

  cancelOffer(offerId: number) {
    this.offerService.cancelOffer(offerId).subscribe(() => {
      this.loadMyOffers();
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
