import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from 'src/app/components/shared/services/product.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from 'src/app/models/product.model';
import {CartService} from 'src/app/components/shared/services/cart.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

    public products: Product[] = [];
    public counter = 1;
    public variantImage: any = '';
    public selectedColor: any = '';
    public selectedSize: any = '';

    constructor(
        private router: Router,
        public productsService: ProductService,
        private cartService: CartService,
        public dialogRef: MatDialogRef<ProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product
    ) {
    }

    ngOnInit() {
        this.productsService.getProducts().subscribe(product => this.products = product);
    }


    public addToCart(product: Product, quantity) {
        if (quantity == 0) {
            return false;
        }
        this.cartService.addToCart(product, parseInt(quantity, 10));
    }

    public close(): void {
        this.dialogRef.close();
    }

    public increment() {
        if (this.counter <= this.product.quantity)
        this.counter += 1;
    }

    public decrement() {
        if (this.counter > 1) {
            this.counter -= 1;
        }
    }

    // Add to cart
    public buyNow() {
        this.router.navigate(['/pocetna/proizvod', this.product.id]).then();
        this.close();
    }

}
