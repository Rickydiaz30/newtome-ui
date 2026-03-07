import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from '../models/listing.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private apiUrl = 'http://localhost:8081/api/listings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }

  create(listing: Partial<Listing>): Observable<Listing> {
    return this.http.post<Listing>(this.apiUrl, listing);
  }

  getMyListings() {
    return this.http.get<Listing[]>(`${this.apiUrl}/mine`);
  }

  deleteListing(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  search(query: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`);
  }
}
