import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../shared/dataModels/product.interface';

@Component({
  selector: 'app-categories-and-products',
  templateUrl: './categories-and-products.component.html',
  styleUrls: ['./categories-and-products.component.scss']
})
export class CategoriesAndProductsComponent implements OnInit {

  @Input() products: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
