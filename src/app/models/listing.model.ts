export interface Listing {
  id: number;
  title: string;
  price: number;
  city: string;
  createdAt: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
}
