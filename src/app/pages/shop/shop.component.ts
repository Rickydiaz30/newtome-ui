import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ListingService } from 'src/app/services/listing-service.service';
import { Listing } from 'src/app/models/listing.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  private listingsUrl = 'http://localhost:8081/api/listings';

  listings: Listing[] = [];
  loading = false;

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings() {
    this.loading = true;

    this.listingService.getAll().subscribe({
      next: (data) => {
        this.listings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load listings', err);
        this.loading = false;
      },
    });
  }
}
