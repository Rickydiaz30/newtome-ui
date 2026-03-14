import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { environment } from 'src/environments/environment';

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
  private baseUrl = environment.apiUrl;
  private listingsApi = `${this.baseUrl}/api/listings`;
  private offersApi = `${this.baseUrl}/api/offers`;

  constructor(private http: HttpClient) {}

  createOffer(
    listingId: number,
    amount: number,
    message: string,
  ): Observable<OfferResponse> {
    return this.http.post<OfferResponse>(
      `${this.listingsApi}/${listingId}/offers`,
      {
        amount,
        message,
      },
    );
  }

  getOffersForListing(listingId: number): Observable<OfferResponse[]> {
    return this.http.get<OfferResponse[]>(
      `${this.listingsApi}/${listingId}/offers`,
    );
  }

  acceptOffer(listingId: number, offerId: number): Observable<OfferResponse> {
    return this.http.post<OfferResponse>(
      `${this.listingsApi}/${listingId}/offers/${offerId}/accept`,
      {},
    );
  }

  rejectOffer(listingId: number, offerId: number): Observable<OfferResponse> {
    return this.http.post<OfferResponse>(
      `${this.listingsApi}/${listingId}/offers/${offerId}/reject`,
      {},
    );
  }

  getMyOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.offersApi}/mine`);
  }

  getOffersReceived(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.offersApi}/received`);
  }

  cancelOffer(offerId: number): Observable<Offer> {
    return this.http.patch<Offer>(`${this.offersApi}/${offerId}/cancel`, {});
  }
}
