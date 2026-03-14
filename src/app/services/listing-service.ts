import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from '../models/listing.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private apiUrl = `${environment.apiUrl}/api/listings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }

  create(listing: Partial<Listing>): Observable<Listing> {
    return this.http
      .post<ApiResponse<Listing>>(this.apiUrl, listing)
      .pipe(map((res) => res.data));
  }

  getMyListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/mine`);
  }

  deleteListing(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/search?query=${query}`);
  }

  getListingById(id: number): Observable<Listing> {
    return this.http
      .get<ApiResponse<Listing>>(`${this.apiUrl}/${id}`)
      .pipe(map((res) => res.data));
  }

  getPresignedUrl(filename: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/uploads/presigned-url?filename=${filename}`,
      {},
    );
  }
}
