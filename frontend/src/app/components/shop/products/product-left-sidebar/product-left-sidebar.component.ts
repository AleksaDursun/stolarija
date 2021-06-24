import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {ProductService} from 'src/app/components/shared/services/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ColorFilter, Product} from 'src/app/models/product.model';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderByPipe} from '../../../shared/pipes/order-by.pipe';
import {DataService} from '../../../shared/services/data.service';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {environment} from '../../../../../environments/environment';
import {MetaService} from '../../../shared/services/meta.service';
import {SchemaService} from '../../../shared/services/schema.service';
import {RESPONSE} from '@nguniversal/express-engine/tokens';

@Component({
    selector: 'app-product-left-sidebar',
    templateUrl: './product-left-sidebar.component.html',
    styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {
    public sidenavOpen = true;
    public animation: any;
    public sortByOrder = '';
    public page: any;
    public tagsFilters: any[] = [];
    public viewType = 'grid';
    public viewCol = 25;
    public filterForm: FormGroup;
    public colorFilters: ColorFilter[] = [];
    private searchTerm: string;
    public totalPages: number;

    public items: Product[] = [];
    public allItems: Product[] = [];
    public products: Product[] = [];
    public tags: any[] = [];
    public colors: any[] = [];
    public minPrice: number;
    public maxPrice: number;

    public innerSearchControl = new FormControl('');
    public newUsedControl = new FormControl('all');
    public brands: string[];
    public selectedBrand = 'Svi';
    public breadcrumbs: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        private orderPipe: OrderByPipe,
        private dataService: DataService,
        public schemaService: SchemaService,
        @Optional() @Inject(RESPONSE) private response: Response,
        @Inject(PLATFORM_ID) private platformId: any,
        private meta: MetaService
    ) {
        this.route.params.subscribe(
            (params: Params) => {
                this.searchTerm = params.searchTerm;
                this.breadcrumbs = this.schemaService.setCategoryBreadcrumbList(this.searchTerm);
                this.dataService.search(this.searchTerm).subscribe(products => {
                    if (!products.body.length) {
                        if (isPlatformServer(this.platformId)) {
                            // @ts-ignore
                            this.response.redirect(302, '/');
                        }
                    }
                    this.totalPages = parseInt(products.headers.get('X-Pagination-Page-Count'), 10);
                    if (!products.headers.get('X-Pagination-Page-Count')) {
                        console.log(products.headers.get('X-Pagination-Page-Count'));
                        this.totalPages = Math.ceil(products.body.length / 20);
                    }
                    // this.loadMore();
                    this.allItems = products.body;
                    this.products = products.body.slice(0.8);
                    this.getTags(products.body);
                    this.getColors(products.body);
                    this.getMinAndMaxPrice(products.body);
                    this.getBrands();
                });
                if (params.filter) {
                    if (params.filter === 'novo') {
                        this.newUsedControl.setValue('false');
                    } else if (params.filter === 'koristeno') {
                        this.newUsedControl.setValue('true');
                    } else {
                        this.newUsedControl.setValue('all');
                    }
                }
            }
        );
    }

    // Get current product tags
    public getTags(products): void {
        let uniqueBrands = [];
        let itemBrand = Array();
        products.map((product, index) => {
            if (product.tags) {
                product.tags.map((tag) => {
                    const index = uniqueBrands.indexOf(tag);
                    if (index === -1) {
                        uniqueBrands.push(tag);
                    }
                });
            }
        });
        for (let i = 0; i < uniqueBrands.length; i++) {
            itemBrand.push({brand: uniqueBrands[i]});
        }
        this.tags = itemBrand;
    }

    // Get current product colors
    public getColors(products): void {
        let uniqueColors = [];
        let itemColor = Array();
        products.map((product, index) => {
            if (product.colors) {
                product.colors.map((color) => {
                    const index = uniqueColors.indexOf(color);
                    if (index === -1) {
                        uniqueColors.push(color);
                    }
                });
            }
        });
        for (let i = 0; i < uniqueColors.length; i++) {
            itemColor.push({color: uniqueColors[i]});
        }
        this.colors = itemColor;
    }

    public getMinAndMaxPrice(products): void {
        const sortedProducts = this.orderPipe.transform(products, 'low');
        if (sortedProducts && sortedProducts.length) {
            this.minPrice = sortedProducts[0].price;
            this.maxPrice = sortedProducts[sortedProducts.length - 1].price;
        }
    }

    ngOnInit() {
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
            {name: 'og:url', content: environment.FRONTEND_URL + this.router.url},
            {name: 'og:image:width', content: '2000'},
            {name: 'og:image:height', content: '1333'},
            {name: 'twitter:image:width', content: '2000'},
            {name: 'twitter:image:height', content: '1333'},
        ]);
    }

    public changeViewType(viewType, viewCol): void {
        this.viewType = viewType;
        this.viewCol = viewCol;
    }

    // Animation Effect fadeIn
    public fadeIn(): void {
        this.animation = 'fadeIn';
    }

    // Animation Effect fadeOut
    public fadeOut(): void {
        this.animation = 'fadeOut';
    }

    // Update tags filter
    public updateTagFilters(tags: any[]): void {
        this.tagsFilters = tags;
        this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
    }


    // sorting type ASC / DESC / A-Z / Z-A etc.
    public onChangeSorting(val): void {
        this.sortByOrder = val;
        this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
    }

    // Initialize filetr Items
    public filterItems(): Product[] {
        return this.items.filter((item: Product) => {
            const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
                if (item.colors) {
                    if (item.colors.includes(curr.color)) {
                        return prev && true;
                    }
                }
            }, true);
            const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
                if (item.tags) {
                    if (item.tags.includes(curr)) {
                        return prev && true;
                    }
                }
            }, true);
            return Colors && Tags; // return true
        });

    }

    public onPageChanged(event): void {
        this.page = event;
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

    // Update price filter
    public updatePriceFilters(price: any): void {
        this.allItems = this.products.filter((item: Product) => {
            return item.price >= price.priceFrom && item.price <= price.priceTo;
        });
    }

    onBrandsChanged(brand): void {
        this.selectedBrand = brand;
    }

    loadMore(): void {
        if (this.totalPages > 1) {
            for (let i = 2; i <= this.totalPages; i++) {
                this.dataService.search(this.searchTerm, i).subscribe(products => {
                    this.allItems.push(...products.body);
                    this.products.push(...products.body.slice(0.8));
                    this.getTags(this.allItems);
                    this.getColors(this.allItems);
                    this.getMinAndMaxPrice(this.allItems);
                    this.getBrands();
                });
            }
        }
    }

    getBrands(): void {
        this.brands = [];
        const brands = this.allItems.map(item => item.brand);
        // const brands = ['ms', 'toshiba', 'logitech'];
        this.brands = [...new Set(brands)];
        this.brands = this.brands.filter(brand => brand != undefined);
        this.brands.unshift('Svi');
        console.log(this.brands);
    }
}
