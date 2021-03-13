
import {Name} from './name.interface';
import {Description} from './description.interface';

export interface Product {
  image: string;
  category_name: string;
  category_key?: string;
  name: Name;
  description: Description;
}
