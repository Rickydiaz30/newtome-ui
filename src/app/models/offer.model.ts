export interface Offer {
  id: number;
  amount: number;
  message: string;
  status: string;
  createdAt: string;

  listingId: number;
  listingTitle: string;
  listingImageUrl: string | null;

  buyerId: number;
  buyerFirstName: string;
}
