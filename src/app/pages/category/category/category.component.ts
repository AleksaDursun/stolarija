import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/dataModels/product.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  @Input() products: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
