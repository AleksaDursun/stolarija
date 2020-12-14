import {Product} from './product.interface';

export interface Category {
  name_sr?: string;
  name_en?: string;
  name_de?: string;
  description_sr?: string;
  description_en?: string;
  description_de?: string;
  products: Product[];
}
