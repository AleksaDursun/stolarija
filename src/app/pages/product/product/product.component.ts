import { Component, OnInit } from '@angular/core';
import {Product} from '../../../shared/dataModels/product.interface';
import {Category} from '../../../shared/dataModels/category.interface';
import {CategoriesAndProductsService} from '../../../shared/services/categories-and-products.service';
import {ActivatedRoute} from '@angular/router';
import {StripSpecialCharsPipe} from '../../../shared/pipes/strip-special-chars.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  selectedProduct: Product;
  products: Product[];
  category: Category | false;

  constructor(
    private route: ActivatedRoute,
    private categoriesAndProducts: CategoriesAndProductsService
  ) {
     this.route.params.subscribe(params => {
       console.log(params);
       if (params.categoryName && params.name) {
         this.category = this.categoriesAndProducts.getCategory(params.categoryName);
         // @ts-ignore
         if (this.category.products) {
           // @ts-ignore
           this.products = Object.values(this.category.products);
           this.selectedProduct = this.products.find(p => StripSpecialCharsPipe.strip(p.name.sr) === StripSpecialCharsPipe.strip(params.name));
         }
       }
     });
  }

}
