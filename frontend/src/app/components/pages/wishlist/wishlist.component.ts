import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from 'src/app/models/product.model';
import {CartService} from '../../shared/services/cart.service';
import {WishlistService} from '../../shared/services/wishlist.service';
import {ProductService} from '../../shared/services/product.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

    public product: Observable<Product[]> = of([]);
    wishlistItems: Product[] = [];
    public isMobile: boolean;

    constructor(
        private cartService: CartService,
        private wishlistService: WishlistService,
        public productsService: ProductService
    ) {
        this.product = this.wishlistService.getProducts();
        this.product.subscribe(products => this.wishlistItems = products);
        this.isMobile = window.innerWidth < 1000 && window.innerWidth < 1000;
    }

    ngOnInit() {
    }

    // Add to cart
    public addToCart(product: Product, quantity: number = 1) {
        if (quantity > 0)
            this.cartService.addToCart(product, quantity);
        this.wishlistService.removeFromWishlist(product);
    }

// Remove from wishlist
    public removeItem(product: Product) {
        this.wishlistService.removeFromWishlist(product);
    }

}
