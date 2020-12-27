import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/dataModels/product.interface';
import {CategoriesAndProductsService} from '../../../shared/services/categories-and-products.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../../shared/dataModels/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {


  products: Product[];
  category: Category;

  constructor(
    private categoriesAndProductsService: CategoriesAndProductsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params.name) {
        // @ts-ignore
        this.category = this.categoriesAndProductsService.getCategory(params.name);
        if (this.category) {
          if (this.category.products) {
            // @ts-ignore
            this.products = Object.values(this.category.products);
          }
        }
      }
    });
  }

}
