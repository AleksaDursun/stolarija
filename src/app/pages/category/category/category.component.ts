import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/dataModels/product.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  @Input() products: Product[] = [
    {
      image: '/assets/images/banner/1.jpeg'
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
      image: '/assets/images/table.jpg'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
