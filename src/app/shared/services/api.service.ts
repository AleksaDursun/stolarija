import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Product} from '../dataModels/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dbPath = '/categories';

  categoriesRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.categoriesRef = db.list(this.dbPath);
  }

  getAllCategories(): AngularFireList<any> {
    return this.categoriesRef;
  }

  create(product: any): any {
    return this.categoriesRef.push(product);
  }

  update(key: string, value: any): Promise<void> {
    return this.categoriesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.categoriesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.categoriesRef.remove();
  }

  addProduct(product: Product): void {
    this.db.list(this.dbPath + '/' + product.category_name + '/' + '/products').push(product);
  }

}
