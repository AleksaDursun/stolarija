import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

    @Input() brands: string[];

    @Output() brandChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }


    brandSelect(event) {
        this.brandChanged.emit(
            event.value
        );
    }

}
