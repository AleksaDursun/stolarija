import { Component } from '@angular/core';
import {CategoriesAndProductsService} from './shared/services/categories-and-products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private categoriesAndProducts: CategoriesAndProductsService
  ) {
    this.categoriesAndProducts.getData();
  }

}
