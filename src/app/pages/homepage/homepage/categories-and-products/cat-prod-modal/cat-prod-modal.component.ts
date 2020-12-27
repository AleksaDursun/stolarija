import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../../shared/dataModels/product.interface';
import {Category} from '../../../../../shared/dataModels/category.interface';

@Component({
  selector: 'app-cat-prod-modal',
  templateUrl: './cat-prod-modal.component.html',
  styleUrls: ['./cat-prod-modal.component.scss']
})
export class CatProdModalComponent {

  products: Product[];
  category: Category;

  constructor() {
    window.addEventListener('productsSent', (e) => {
      this.products = [];
      // @ts-ignore
      this.category = e.detail;
      // @ts-ignore
      if (e.detail.products) {
        // @ts-ignore
        this.products = Object.values(e.detail.products);
      }

    });
  }

}
