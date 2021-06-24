import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product.model';
import {ProductService} from 'src/app/components/shared/services/product.service';
import {DataService} from '../../../shared/services/data.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit {

  public products: Product[];
  public product: Product = {};

  constructor(
      private dataService: DataService,
      public productsService: ProductService
  ) {
  }

  ngOnInit() {
    this.dataService.getProductsOnSale().subscribe(products => {
      this.products = products.body.slice(0, 20);
    });
  }
}
