import {Product} from './product.interface';
import {Name} from './name.interface';
import {Description} from './description.interface';

export interface Category {
  icon: string;
  name: string;
  title: Name;
  description: Description;
  key: string;
  products?: Product[];
}
