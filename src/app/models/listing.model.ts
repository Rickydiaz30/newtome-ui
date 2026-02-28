export interface Listing {
  id: number;
  title: string;
  price: number;
  city: string;
  createdAt: string;
  imageUrl?: string;
  category?: { name: string; id?: number };
  status?: 'ACTIVE' | 'DRAFT' | 'SOLD';
  description?: string; // ✅ add this
}
