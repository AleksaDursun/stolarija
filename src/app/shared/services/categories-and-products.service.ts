import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Subscription} from 'rxjs';
import {Category} from '../dataModels/category.interface';
import {LocalStorageService} from './local-storage.service';
import {ConstService} from './const.service';
import {Product} from '../dataModels/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesAndProductsService {
  private categoriesSub: Subscription;

  constructor(private api: ApiService) {
  }

  getData(): void {
    this.categoriesSub = this.api.getAllCategories().valueChanges().subscribe(data => {
      this.setCategories(data);
    });
  }

  private setCategories(data): void {
    const categories = this.mapData(data[0]);
    LocalStorageService.setItem(ConstService.CATEGORIES, JSON.stringify(categories));
  }

  private mapData(data): Category[] {
    const categories = [];
    const keys = Object.keys(data);
    for (let key of keys) {
      data[key].key = key;
      categories.push(data[key]);
    }
    return categories;
  }

  public static get CATEGORIES_AND_PRODUCTS(): Category[] {
    const categories = JSON.parse(LocalStorageService.getItem(ConstService.CATEGORIES));
    if (categories) {
      return categories;
    }
    return [];
  }

  addProduct(product: Product): void {
    this.api.addProduct(product);
  }

  addCategory(category): void {
    this.api.addCategory(category);
  }

}
