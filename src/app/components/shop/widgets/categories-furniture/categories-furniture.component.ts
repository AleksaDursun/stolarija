import { Component, OnInit } from '@angular/core';
import {CategoriesAndProductsService} from '../../../shared/services/categories-and-products.service';

@Component({
  selector: 'app-categories-furniture',
  templateUrl: './categories-furniture.component.html',
  styleUrls: ['./categories-furniture.component.sass']
})
export class CategoriesFurnitureComponent implements OnInit {

  constructor(
    private data: CategoriesAndProductsService
  ) { }

  ngOnInit(): void {
    console.log(CategoriesAndProductsService.CATEGORIES_AND_PRODUCTS);
  }

}
