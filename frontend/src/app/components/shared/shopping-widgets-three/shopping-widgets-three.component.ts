import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-widgets-three',
  templateUrl: './shopping-widgets-three.component.html',
  styleUrls: ['./shopping-widgets-three.component.scss']
})
export class ShoppingWidgetsThreeComponent implements OnInit {

  public sidenavMenuItems:Array<any>;

  @Input() shoppingCartItems: CartItem[] = [];

  constructor(private cartService: CartService, public productService: ProductService) {
  }

  ngOnInit() {
  }
  public updateCurrency(curr) {
    this.productService.currency = curr;
  }


  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }


}











