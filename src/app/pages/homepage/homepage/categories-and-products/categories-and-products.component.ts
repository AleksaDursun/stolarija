import {Component} from '@angular/core';
import {Category} from '../../../../shared/dataModels/category.interface';
import {CategoriesAndProductsService} from '../../../../shared/services/categories-and-products.service';
import {Product} from '../../../../shared/dataModels/product.interface';

@Component({
  selector: 'app-categories-and-products',
  templateUrl: './categories-and-products.component.html',
  styleUrls: ['./categories-and-products.component.scss']
})
export class CategoriesAndProductsComponent {

  public categories: Category[];

  constructor() {
    this.categories = CategoriesAndProductsService.CATEGORIES_AND_PRODUCTS;
  }

  sendProductsToModal(category: Category): void {
    const e = new CustomEvent('productsSent', {detail: category});
    window.dispatchEvent(e);
  }
}
