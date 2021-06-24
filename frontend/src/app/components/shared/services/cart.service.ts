import {Injectable} from '@angular/core';
import {Product} from 'src/app/models/product.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartItem} from 'src/app/models/cart-item';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

// Get product from Localstorage
let products = LocalStorageService.getItem('cartItem') ? JSON.parse(LocalStorageService.getItem('cartItem')) : [];

@Injectable({
    providedIn: 'root'
})
export class CartService {

// Array
    public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
    public observer: Subscriber<{}>;

    constructor(public snackBar: MatSnackBar) {
        this.cartItems.subscribe(
            products => products = products
        );
    }

    // Get Products
    public getItems(): Observable<CartItem[]> {
        const itemsStream = new Observable(observer => {
            observer.next(products);
            observer.complete();
        });
        return itemsStream as Observable<CartItem[]>;
    }

    // Add to cart
    public addToCart(product: Product, quantity: number) {
        let message, status;
        let item: CartItem | boolean = false;
        // If Products exist
        const hasItem = products.find((items, index) => {
            if (items.product.id == product.id) {
                const qty = ((products[index].quantity + quantity) > product.quantity) ? product.quantity : products[index].quantity + quantity;
                const stock = this.calculateStockCounts(products[index], quantity);
                if (qty != 0 && stock) {
                    products[index].quantity = qty;
                    message = 'Proizvod ' + product.name + ' je dodat u košaricu.';
                    status = 'success';
                    this.snackBar.open(message, '×', {panelClass: [status], verticalPosition: 'top', duration: 3000});
                }
                return true;
            }
        });

        // If Products does not exist (Add New Products)
        if (!hasItem) {
            item = {product, quantity};
            products.push(item);
            message = 'Proizvod ' + product.name + ' je dodat u košaricu.';
            status = 'success';
            this.snackBar.open(message, '×', {panelClass: [status], verticalPosition: 'top', duration: 3000});
        }

        LocalStorageService.setItem('cartItem', JSON.stringify(products));
        return item;

    }

// Calculate Product stock Counts
    public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
        let message, status;
        const qty = product.quantity + quantity;
        const stock = product.product.stock;
        if (stock < qty) {
            // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
            this.snackBar.open('Nije moguće izabrati količinu veću od one na stanju. Na stanju je ' + stock + ' koamda.', '×', {
                panelClass: 'error',
                verticalPosition: 'top',
                duration: 3000
            });
            return false;
        }
        return true;
    }


// Removed in cart
    public removeFromCart(item: CartItem) {
        if (item === undefined) {
            return false;
        }
        const index = products.indexOf(item);
        products.splice(index, 1);
        LocalStorageService.setItem('cartItem', JSON.stringify(products));
    }

// Total amount
    public getTotalAmount(): Observable<number> {
        return this.cartItems.pipe(map((product: CartItem[]) => {
            return products.reduce((prev, curr: CartItem) => {
                return prev + curr.product.discount_price * curr.quantity;
            }, 0);
        }));
    }

// Update Cart Value
    public updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
        return products.find((items, index) => {
            if (items.product.id == product.id) {
                const qty = ((products[index].quantity + quantity) > product.quantity) ? product.quantity : products[index].quantity + quantity;
                const stock = this.calculateStockCounts(products[index], quantity);
                if (qty != 0 && stock) {
                    products[index].quantity = qty;
                }
                LocalStorageService.setItem('cartItem', JSON.stringify(products));
                return true;
            }
        });
    }

    public emptyCart(): void {
        products = [];
        LocalStorageService.setItem('cartItem', JSON.stringify(products));
    }


}
