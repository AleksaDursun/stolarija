import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../dataModels/product.interface';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

  dismissModal(): void {
    $('#categoryModal').modal('toggle');
  }

}
