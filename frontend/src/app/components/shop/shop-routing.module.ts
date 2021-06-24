import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductLeftSidebarComponent} from './products/product-left-sidebar/product-left-sidebar.component';


// Routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'proizvodi/:searchTerm',
    component: ProductLeftSidebarComponent
  },
  {
    path: 'proizvodi/:searchTerm/:filter',
    component: ProductLeftSidebarComponent
  },
  {
    path: 'proizvod/:id',
    component: ProductDetailsComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
