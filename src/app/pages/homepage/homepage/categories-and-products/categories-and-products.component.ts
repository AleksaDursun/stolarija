import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../shared/dataModels/product.interface';

@Component({
  selector: 'app-categories-and-products',
  templateUrl: './categories-and-products.component.html',
  styleUrls: ['./categories-and-products.component.scss']
})
export class CategoriesAndProductsComponent implements OnInit {

  @Input() products: Product[] = [
    {
      image: '/assets/images/banner/1.jpeg'
    },
    {
      image: '/assets/images/banner/2.jpeg'
    },
    {
      image: '/assets/images/table.jpg'
    },
    {
      image: '/assets/images/banner/1.jpeg'
    },
    {
      image: '/assets/images/banner/2.jpeg'
    },
    {
      image: '/assets/images/table.jpg'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
