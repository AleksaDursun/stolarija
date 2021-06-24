import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../shared/services/cart.service';
import {Observable, of, Subscription} from 'rxjs';
import {CartItem} from 'src/app/models/cart-item';
import {ProductService} from '../../shared/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateForm} from '../../../validators/validate-form.validator';
import {ApiService} from '../../shared/services/api.service';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    public cartItems: Observable<CartItem[]> = of([]);
    public buyProducts: CartItem[] = [];
    public isButtonDisabled = false;
    public showError = false;
    private validationSub: Subscription;

    public checkoutForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zip_code: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('',  Validators.required),
        notes: new FormControl(''),
        order_items: new FormControl([]),
        a4_receipt: new FormControl(false),
        company_name: new FormControl('', ),
        company_id: new FormControl(''),
        company_address: new FormControl('')
    });

    amount: number;

    constructor(
        private cartService: CartService,
        public productService: ProductService,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.cartItems = this.cartService.getItems();
        this.cartItems.subscribe(products => this.buyProducts = products);
        this.getTotal().subscribe(amount => this.amount = amount);

        this.validationSub = this.checkoutForm.get('a4_receipt').valueChanges.pipe(
            tap((a4Receipt: boolean) => {
                if (a4Receipt) {
                    this.checkoutForm.get('company_name').setValidators(Validators.required);
                    this.checkoutForm.get('company_id').setValidators(Validators.required);
                    this.checkoutForm.get('company_address').setValidators(Validators.required);
                } else {
                    this.checkoutForm.get('company_name').clearValidators();
                    this.checkoutForm.get('company_id').clearValidators();
                    this.checkoutForm.get('company_address').clearValidators();
                }
                this.checkoutForm.get('company_name').updateValueAndValidity();
                this.checkoutForm.get('company_id').updateValueAndValidity();
                this.checkoutForm.get('company_address').updateValueAndValidity();
            })
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.validationSub) {
            this.validationSub.unsubscribe();
        }
    }

    public getTotal(): Observable<number> {
        return this.cartService.getTotalAmount();
    }

    @ValidateForm('checkoutForm')
    public placeOrder(): void {
        this.isButtonDisabled = true;
        this.checkoutForm.get('order_items').setValue(this.buyProducts.map(item => {
            return {
                product: item.product.id,
                quantity: item.quantity
            };
        }));
        if (this.checkoutForm.valid) {
            this.api.placeOrder(this.checkoutForm.value).subscribe(res => {
                // @ts-ignore
                if (res.body.success) {
                    this.isButtonDisabled = false;
                    this.router.navigate(['/info', 'narudzba-uspjesna']).then();
                }
            }, error => {
                this.isButtonDisabled = false;
                this.showError = true;
            }, () => {
                this.isButtonDisabled = false;
            });
        }
    }
}
