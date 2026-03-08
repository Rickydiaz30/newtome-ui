import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

export interface OfferResponse {
  id: number;
  amount: number;
  message: string;
  status: string;
  createdAt: string;
  listingId: number;
  listingTitle: string;
  buyerId: number;
  buyerFirstName: string;
}

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = 'http://localhost:8081/api/listings';

  constructor(private http: HttpClient) {}

  createOffer(
    listingId: number,
    amount: number,
    message: string,
  ): Observable<OfferResponse> {
    return this.http.post<OfferResponse>(`${this.apiUrl}/${listingId}/offers`, {
      amount,
      message,
    });
  }

  getOffersForListing(listingId: number): Observable<OfferResponse[]> {
    return this.http.get<OfferResponse[]>(`${this.apiUrl}/${listingId}/offers`);
  }

  acceptOffer(listingId: number, offerId: number): Observable<OfferResponse> {
    return this.http.post<OfferResponse>(
      `${this.apiUrl}/${listingId}/offers/${offerId}/accept`,
      {},
    );
  }

  getMyOffers() {
    return this.http.get<Offer[]>(`http://localhost:8081/api/offers/mine`);
  }

  getOffersReceived() {
    return this.http.get<Offer[]>('http://localhost:8081/api/offers/received');
  }

  cancelOffer(offerId: number) {
    return this.http.patch<Offer>(
      `http://localhost:8081/api/offers/${offerId}/cancel`,
      {},
    );
  }

  rejectOffer(listingId: number, offerId: number) {
    return this.http.post<Offer>(
      `${this.apiUrl}/${listingId}/offers/${offerId}/reject`,
      {},
    );
  }
}
