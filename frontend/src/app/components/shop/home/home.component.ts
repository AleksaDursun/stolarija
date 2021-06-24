import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Product} from 'src/app/models/product.model';
import {DataService} from '../../shared/services/data.service';
import {MetaService} from '../../shared/services/meta.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    products: Product[];
    contentLoaded = false;
    public banners = [];
    public menuItems;

    constructor(
        private productService: ProductService,
        private dataService: DataService,
        private meta: MetaService
    ) {

    }

    ngOnInit() {
        this.dataService.MENU_ITEMS.subscribe(res => {
            this.menuItems = res;
        });
        this.dataService.getProductsOnSale().subscribe(products => {
            this.products = products.body;
            this.contentLoaded = true;
        });
        this.productService.getBanners().subscribe(data => this.banners = data);
        this.meta.addTags([
            {name: 'og:site_name', content: 'Umjetnost u Drvetu'},
            {name: 'og:title', content: 'Prodaja kompjuterske opreme - Umjetnost u Drvetu'},
            {name: 'og:locale', content: 'en_US'},
            {name: 'og:image', content: `${environment.FRONTEND_URL}/assets/images/mLogo.png`},
            {name: 'twitter:image', content: `${environment.FRONTEND_URL}/assets/images/mLogo.png`},
            {name: 'og:type', content: 'article'},
            {name: 'keywords', content: 'računari,kompjuteri,printeri,toneri,monitori,monitor,kompjuter,laptop'},
            {
                name: 'og:description',
                content: 'Umjetnost u Drvetu d.o.o. je kompanija koja se bavi prodajom vrhunske informatičke opreme, ' +
                    'te pružanjem inovativnih informatičkih usluga I servisa.'
            },
            {
                name: 'description',
                content: 'Umjetnost u Drvetu d.o.o. je kompanija koja se bavi prodajom vrhunske informatičke opreme, ' +
                    'te pružanjem inovativnih informatičkih usluga I servisa.'
            },
            {name: 'og:url', content: environment.FRONTEND_URL + '/pocetna'},
            {name: 'og:image:width', content: '2000'},
            {name: 'og:image:height', content: '1333'},
        ]);
    }


}
