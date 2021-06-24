import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    OnInit,
    Optional,
    Output,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import {Product} from 'src/app/models/product.model';
import {ProductService} from 'src/app/components/shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CartService} from 'src/app/components/shared/services/cart.service';
import {SwiperConfigInterface, SwiperDirective} from 'ngx-swiper-wrapper';
import {ProductZoomComponent} from './product-zoom/product-zoom.component';
import {DataService} from '../../../shared/services/data.service';
import {environment} from '../../../../../environments/environment';
import {MetaService} from '../../../shared/services/meta.service';
import {SchemaService} from '../../../shared/services/schema.service';
import {isPlatformServer} from '@angular/common';
import {RESPONSE} from '@nguniversal/express-engine/tokens';


@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

    public config: SwiperConfigInterface = {};
    @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

    @ViewChild('zoomViewer', {static: true}) zoomViewer;
    @ViewChild(SwiperDirective, {static: true}) directiveRef: SwiperDirective;

    public product: Product = {};
    public products: Product[] = [];

    public image: any;
    public zoomImage: any;

    public counter = 1;

    index: number;
    bigProductImageIndex = 0;

    constructor(
        private route: ActivatedRoute,
        public productsService: ProductService,
        public dialog: MatDialog,
        private router: Router,
        private cartService: CartService,
        private dataService: DataService,
        private meta: MetaService,
        private schemaService: SchemaService,
        @Optional() @Inject(RESPONSE) private response: Response,
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        this.route.params.subscribe(params => {
            const id = +params.id;
            this.dataService.getProduct(id).subscribe(product => {
                if (product.body[0]) {
                    this.product = product.body[0];
                    this.counter = this.product.quantity ? 1 : 0;
                    this.getRelatedProducts();
                    this.addMetaTags();
                } else {
                    this.router.navigateByUrl('/info/404').then();
                }
            });
        });
    }

    ngOnInit() {

    }


    ngAfterViewInit() {
        this.config = {
            observer: true,
            slidesPerView: 3,
            spaceBetween: 10,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 3,
                },


            }
        };
    }


    public openProductDialog(product, bigProductImageIndex) {
        const dialogRef = this.dialog.open(ProductZoomComponent, {
            data: {product, index: bigProductImageIndex},
            panelClass: 'product-dialog',
        });
        dialogRef.afterClosed().subscribe(product => {
            if (product) {
                this.router.navigate(['/products', product.id, product.name]);
            }
        });
    }


    public selectImage(index) {
        console.log(this.product);
        console.log(index);
        this.bigProductImageIndex = index;
    }


    public increment() {
        if (this.product.quantity > this.counter) {
            this.counter += 1;
        }
    }

    public decrement() {
        if (this.counter > 1) {
            this.counter -= 1;
        }
    }

    getRelatedProducts() {
        this.dataService.search(this.product.category).subscribe(products => {
            this.products = products.body;
        });
    }

    // Add to cart
    public addToCart(product: Product, quantity) {
        if (quantity == 0) {
            return false;
        }
        this.cartService.addToCart(product, parseInt(quantity, 10));
    }

    // Add to cart
    public buyNow(product: Product, quantity) {
        if (quantity > 0) {
            this.cartService.addToCart(product, parseInt(quantity, 10));
            this.router.navigate(['/info/kupovina']);
        }
    }


    public onMouseMove(e) {
        if (window.innerWidth >= 1280) {
            let image, offsetX, offsetY, x, y, zoomer;
            image = e.currentTarget;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            x = offsetX / image.offsetWidth * 100;
            y = offsetY / image.offsetHeight * 100;
            zoomer = this.zoomViewer.nativeElement.children[0];
            if (zoomer) {
                zoomer.style.backgroundPosition = x + '% ' + y + '%';
                zoomer.style.display = 'block';
                zoomer.style.height = image.height + 'px';
                zoomer.style.width = image.width + 'px';
            }
        }
    }

    public onMouseLeave(event) {
        this.zoomViewer.nativeElement.children[0].style.display = 'none';
    }

    public openZoomViewer() {
        this.dialog.open(ProductZoomComponent, {
            data: this.zoomImage,
            panelClass: 'zoom-dialog'
        });
    }

    private addMetaTags() {
        this.meta.addTags([
            {name: 'og:site_name', content: `Umjetnost u Drvetu`},
            {name: 'og:title', content: `${this.product.name} - Umjetnost u Drvetu`},
            {name: 'og:locale', content: 'en_US'},
            {name: 'og:image', content: this.product.image_url},
            {name: 'twitter:image', content: this.product.image_url},
            {name: 'og:type', content: 'product'},
            {name: 'keywords', content: 'računari,kompjuteri,printeri,toneri,monitori,monitor,kompjuter,laptop'},
            {
                name: 'og:description',
                content: this.product.short_description
            },
            {
                name: 'description',
                content: this.product.short_description
            },
            {name: 'og:url', content: environment.FRONTEND_URL + this.router.url},
            {name: 'og:image:width', content: '2000'},
            {name: 'og:image:height', content: '1333'},
            {name: 'twitter:image:width', content: '2000'},
            {name: 'twitter:image:height', content: '1333'},
        ]);
    }

    public getProductSchema(product) {
        return this.schemaService.setProductMetaData(product);
    }

    getBreadcrumbSchema(product) {
        return this.schemaService.setProductBreadcrumbList(product.category, product);
    }
}


