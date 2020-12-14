import {Product} from './product.interface';
import {Name} from './name.interface';
import {Description} from './description.interface';

export interface Category {
  name: string;
  title: Name;
  description: Description;
  products: Product[];
}
