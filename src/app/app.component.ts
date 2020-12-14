import { Component } from '@angular/core';
import {ApiService} from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private api: ApiService
  ) {
    this.getCategoriesAndProducts();
  }


  getCategoriesAndProducts(): void {
    this.api.getAllCategories().valueChanges().subscribe(data => {
      console.log(data);
    });
  }

}
