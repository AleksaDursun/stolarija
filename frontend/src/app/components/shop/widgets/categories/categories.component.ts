import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {SidenavMenu} from '../../../shared/sidebar/sidebar-menu.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: SidenavMenu[];

  constructor(
      private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.MENU_ITEMS.subscribe(categories => {
      this.categories = categories;
    });
  }

}
