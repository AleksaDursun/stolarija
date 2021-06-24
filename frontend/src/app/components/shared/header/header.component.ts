import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from '../services/cart.service';
import { SidebarMenuService } from '../sidebar/sidebar-menu.service';
import { AppSettings, Settings } from '../services/color-option.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public sidenavMenuItems: Array<any>;

  products: Product[];

  searchControl = new FormControl('', Validators.required);

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  public settings: Settings;
  public isMobile: boolean;

  constructor(
      private cartService: CartService,
      public appSettings: AppSettings,
      private router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.isMobile = window.innerWidth < 500 && window.innerWidth < 500;
  }

  search() {
    if (this.searchControl.valid) {
      this.router.navigateByUrl('/pocetna/proizvodi/' + this.searchControl.value).then();
    }
  }
}
