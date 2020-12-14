import {Component, OnDestroy} from '@angular/core';
import {Product} from '../../../shared/dataModels/product.interface';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy {

  categories;
  private categoriesSub;

  constructor(
    private api: ApiService
  ) {
    this.getCategories();
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }

  onSubmit(product: Product): void {
    this.api.addProduct(product);
  }

  private getCategories(): void {
    this.categoriesSub = this.api.getAllCategories().valueChanges().subscribe(data => {
      this.categories = data;
    });
  }
}
