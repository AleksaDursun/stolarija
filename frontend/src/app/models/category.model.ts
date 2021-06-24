import { Product } from './product.model';

// cart items
export interface Category {
  Ukupno?: Product[];
  id: number;
  name: string;
  sub_category?: any;
  have_used_items: 0 | 1;
}
