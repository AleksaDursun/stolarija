import {Component} from '@angular/core';
import {Category} from '../../../shared/dataModels/category.interface';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  constructor(
    private api: ApiService
  ) {
  }

  onSubmit(e: Category): void {
    this.api.addCategory(e);
  }

}
