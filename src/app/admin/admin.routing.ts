import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AddProductComponent} from './admin-panel/add-product/add-product.component';
import {AddCategoryComponent} from './admin-panel/add-category/add-category.component';
import {EditCategoryComponent} from './admin-panel/edit-category/edit-category.component';
import {EditProductComponent} from './admin-panel/edit-product/edit-product.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'panel',
    component: AdminPanelComponent,
    children: [
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'edit-category',
        component: EditCategoryComponent
      },
      {
        path: 'edit-product',
        component: EditProductComponent
      }
    ]
  },
];
