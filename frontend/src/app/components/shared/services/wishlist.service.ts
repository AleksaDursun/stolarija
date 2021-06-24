import {Injectable} from '@angular/core';
import {Product} from '../../../models/product.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

// Get product from Localstorage
const products = LocalStorageService.getItem('wishlistItem') ? JSON.parse(LocalStorageService.getItem('wishlistItem')) : [];

@Injectable({
    providedIn: 'root'
})
export class WishlistService {

    // wishlist array
    public wishlistProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    public observer: Subscriber<{}>;

    constructor(public snackBar: MatSnackBar) {
    }

    // Get  wishlist Products
    public getProducts(): Observable<Product[]> {
        const itemsStream = new Observable(observer => {
            observer.next(products);
            observer.complete();
        });
        return itemsStream as Observable<Product[]>;
    }


    // If item is aleready added In wishlist
    public hasProduct(product: Product): boolean {
        const item = products.find(item => item.id === product.id);
        return item !== undefined;
    }

    // Add to wishlist
    public addToWishlist(product: Product): Product | boolean {
        let message, status;
        let item: Product | boolean = false;
        if (this.hasProduct(product)) {
            item = products.filter(item => item.id === product.id)[0];
            const index = products.indexOf(item);
        } else {
            products.push(product);
        }
        message = 'Proizvod ' + product.name + ' je dodat u "Omiljeno".';
        status = 'success';
        this.snackBar.open(message, '×', {panelClass: [status], verticalPosition: 'top', duration: 3000});
        LocalStorageService.setItem('wishlistItem', JSON.stringify(products));
        return item;
    }


    // Removed Product
    public removeFromWishlist(product: Product) {
        if (product === undefined) {
            return;
        }
        const index = products.indexOf(product);
        products.splice(index, 1);
        LocalStorageService.setItem('wishlistItem', JSON.stringify(products));
    }
}
