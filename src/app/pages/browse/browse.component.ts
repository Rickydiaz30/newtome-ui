import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Listing = {
  id: number;
  title: string;
  price: number;
  city: string;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
};

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  private listingsUrl = 'http://localhost:8081/api/listings';

  listings: Listing[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings() {
    this.loading = true;

    this.http.get<Listing[]>(this.listingsUrl).subscribe({
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
