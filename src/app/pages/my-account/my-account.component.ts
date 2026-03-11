import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing-service.service';
import { Listing } from '../../models/listing.model';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

type MeResponse = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string | null;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
};

@Component({
  selector: 'app-my-account',
  standalone: true,
  templateUrl: './my-account.component.html',
  imports: [CommonModule, RouterLink, SpinnerComponent, FormsModule],
})
export class AccountComponent implements OnInit {
  user: MeResponse | null = null;
  loading = false;
  error: string | null = null;
  loadingOfferId: number | null = null;
  loadingAction: 'accept' | 'reject' | null = null;
  myListings: Listing[] = [];
  myOffers: Offer[] = [];
  receivedOffers: Offer[] = [];
  loadingOffers = false;
  editing = false;

  editModel = {
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  };

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

    this.http.get<MeResponse>('http://localhost:8081/api/users/me').subscribe({
      next: (user) => {
        console.log('ME RESPONSE:', user);
        this.user = user;
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
    this.loadingOfferId = offerId;
    this.loadingAction = 'accept';

    this.offerService.acceptOffer(listingId, offerId).subscribe({
      next: () => {
        this.loadReceivedOffers();
        this.loadingOfferId = null;
        this.loadingAction = null;
      },
      error: () => {
        this.loadingOfferId = null;
        this.loadingAction = null;
        alert('Failed to accept offer.');
      },
    });
  }

  rejectOffer(listingId: number, offerId: number) {
    this.loadingOfferId = offerId;
    this.loadingAction = 'reject';

    this.offerService.rejectOffer(listingId, offerId).subscribe({
      next: (updatedOffer) => {
        const offer = this.receivedOffers.find((o) => o.id === updatedOffer.id);
        if (offer) {
          offer.status = updatedOffer.status;
        }

        this.loadingOfferId = null;
        this.loadingAction = null;
      },
      error: () => {
        this.loadingOfferId = null;
        this.loadingAction = null;
      },
    });
  }

  startEdit() {
    if (!this.user) return;

    this.editing = true;

    this.editModel = {
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      phone: this.user.phone || '',
      streetAddress: this.user.streetAddress || '',
      city: this.user.city || '',
      state: this.user.state || '',
      zipCode: this.user.zipCode || '',
    };
  }

  cancelEdit() {
    this.editing = false;
  }

  saveProfile() {
    this.loading = true;

    this.http
      .patch<any>('http://localhost:8081/api/users/me', this.editModel)
      .subscribe({
        next: (res) => {
          this.user = res;

          this.editing = false;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to update profile');
        },
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
