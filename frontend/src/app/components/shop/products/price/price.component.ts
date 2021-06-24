import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';

@Component({
    selector: 'app-price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {


    public priceFrom = 0;
    public priceTo = 1599;
    // Using Output EventEmitter
    @Output() priceFilters = new EventEmitter();

    // define min, max and range
    @Input() public min = 100;
    @Input() public max = 1000;
    public range = [100, 1000];

    constructor(
        public productService: ProductService
    ) {
    }

    ngOnInit() {
        this.range = [this.min, this.max];
        this.priceTo = this.max;
    }

    // rangeChanged
    priceChanged(event: any) {
        setInterval(() => {
            this.priceFilters.emit(event);
        }, 1000);
    }

    priceFilter() {
        this.priceFilters.emit({
            priceFrom: this.priceFrom,
            priceTo: this.priceTo
        });
    }
}
