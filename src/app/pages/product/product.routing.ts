import {ProductComponent} from './product/product.component';

export const ROUTES = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: ':id',
    component: ProductComponent
  },
];
