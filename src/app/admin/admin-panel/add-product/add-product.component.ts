import {Component, OnDestroy} from '@angular/core';
import {Product} from '../../../shared/dataModels/product.interface';
import {ApiService} from '../../../shared/services/api.service';
import {map} from 'rxjs/operators';
import {CategoriesAndProductsService} from '../../../shared/services/categories-and-products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  categories;

  constructor(
    private categoriesAndProductsService: CategoriesAndProductsService
  ) {
    this.categories = CategoriesAndProductsService.CATEGORIES_AND_PRODUCTS;
  }

  onSubmit(product: Product): void {
    this.categoriesAndProductsService.addProduct(product);
  }

}
