import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing-service.service';
import { Listing } from '../../models/listing.model';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type MeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string | null;
};

@Component({
  selector: 'app-my-account',
  standalone: true,
  templateUrl: './my-account.component.html',
  imports: [CommonModule, RouterLink],
})
export class AccountComponent implements OnInit {
  user: MeResponse | null = null;
  loading = false;
  error: string | null = null;

  myListings: Listing[] = [];
  myOffers: Offer[] = [];
  receivedOffers: Offer[] = [];
  loadingOffers = false;

  selectedTab:
    | 'ACCOUNT'
    | 'ACTIVE'
    | 'SOLD'
    | 'OFFERS_MADE'
    | 'OFFERS_RECEIVED' = 'ACCOUNT';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private offerService: OfferService,
    private listingService: ListingService,
  ) {}

  ngOnInit(): void {
    this.loadMe();
    this.loadMyListings();
    this.loadMyOffers();

    this.offerService.getOffersReceived().subscribe({
      next: (offers) => {
        this.receivedOffers = offers;
      },
    });
  }

  selectTab(
    tab: 'ACCOUNT' | 'ACTIVE' | 'SOLD' | 'OFFERS_MADE' | 'OFFERS_RECEIVED',
  ) {
    this.selectedTab = tab;
  }

  loadMe() {
    this.loading = true;
    this.error = null;

    this.http
      .get<ApiResponse<MeResponse>>('http://localhost:8081/api/users/me')
      .subscribe({
        next: (res) => {
          this.user = res.data;
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

  get activeListings(): Listing[] {
    return this.myListings.filter((l) => l.status === 'ACTIVE');
  }

  get soldListings(): Listing[] {
    return this.myListings.filter((l) => l.status === 'SOLD');
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

  loadReceivedOffers() {
    this.offerService.getOffersReceived().subscribe({
      next: (offers) => {
        this.receivedOffers = offers;
      },
      error: () => {
        console.error('Failed to load received offers');
      },
    });
  }

  deleteListing(id: number) {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    this.listingService.deleteListing(id).subscribe({
      next: () => {
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

  acceptOffer(listingId: number, offerId: number) {
    this.offerService.acceptOffer(listingId, offerId).subscribe({
      next: () => {
        this.loadReceivedOffers();
      },
      error: () => {
        alert('Failed to accept offer.');
      },
    });
  }

  rejectOffer(listingId: number, offerId: number) {
    this.offerService.rejectOffer(listingId, offerId).subscribe({
      next: (updatedOffer) => {
        const offer = this.receivedOffers.find((o) => o.id === updatedOffer.id);
        if (offer) {
          offer.status = updatedOffer.status;
        }
      },
      error: (err) => {
        console.error('Failed to reject offer', err);
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
