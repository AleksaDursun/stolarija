import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../shared/services/cart.service';
import {CartItem} from '../../../models/cart-item';
import {ProductService} from '../../shared/services/product.service';

@Component({
    selector: 'app-order-success',
    templateUrl: './order-success.component.html',
    styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit, OnDestroy {

    public cart: CartItem[];
    public total: number;

    constructor(
        private cartService: CartService,
        public productService: ProductService
    ) {
    }

    ngOnInit(): void {
        this.cartService.getItems().subscribe(items => {
            this.cart = items;
        });
        this.cartService.getTotalAmount().subscribe(total => {
            this.total = total;
        });
    }

    ngOnDestroy() {
        this.cartService.emptyCart();
    }

}
