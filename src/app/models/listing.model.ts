export interface Listing {
  id: number;
  title: string;
  description: string;
  color: string;
  price: number;
  city: string;
  status: string;
  createdAt: string;
  imageUrl: string;

  categoryId: number;
  categoryName: string;

  ownerId: number;
  ownerFirstName: string;
}
