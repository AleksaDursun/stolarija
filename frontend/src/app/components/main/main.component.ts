import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Product} from '../../models/product.model';
import {CartItem} from '../../models/cart-item';
import {CartService} from '../shared/services/cart.service';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarMenuService} from '../shared/sidebar/sidebar-menu.service';
import {SidenavMenu} from '../shared/sidebar/sidebar-menu.model';
import {DataService} from '../shared/services/data.service';
import {isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    public currencies = ['USD', 'EUR'];
    public currency: any;
    public flags = [
        {name: 'English', image: 'assets/images/flags/gb.svg'},
        {name: 'German', image: 'assets/images/flags/de.svg'},
        {name: 'French', image: 'assets/images/flags/fr.svg'},
        {name: 'Russian', image: 'assets/images/flags/ru.svg'},
        {name: 'Turkish', image: 'assets/images/flags/tr.svg'}
    ];
    public flag: any;
    public products: Product[];
    public indexProduct: number;
    public shoppingCartItems: CartItem[] = [];
    public banners = [];
    public wishlistItems: Product[] = [];
    public url: any;
    public navItems: SidenavMenu[] = [
        {
            displayName: 'Početna',
            iconName: 'recent_actors',
            route: '/pocetna'
        },
        {
            displayName: 'Kategorije',
            iconName: 'movie_filter',
            children: []
        },
        {
            displayName: 'Kontakt',
            iconName: 'report_problem',
            route: '/info/kontakt'
        },
        {
            displayName: 'O Nama',
            iconName: 'feedback',
            route: '/info/o-nama'
        },
    ];
    private routerSub: Subscription;
    private menuItemsSub: Subscription;
    private cartSub: Subscription;

    constructor(public router: Router,
                private cartService: CartService,
                public sidenavMenuService: SidebarMenuService,
                private dataService: DataService,
                @Inject(PLATFORM_ID) private platformId
    ) {
        this.cartSub = this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
        this.routerSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
                if (isPlatformBrowser(this.platformId)) {
                    const el = document.getElementById('close-button');
                    if (el) {
                        el.click();
                    }
                }
            }
        });
        this.menuItemsSub = this.dataService.MENU_ITEMS.subscribe(items => {
            this.navItems.map(item => {
                if (item.displayName === 'Kategorije') {
                    item.children = items;
                }
                return item;
            });
        });
    }

    ngOnInit() {
        this.currency = this.currencies[0];
        this.flag = this.flags[0];
    }

    ngOnDestroy() {
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
        if (this.menuItemsSub) {
            this.menuItemsSub.unsubscribe();
        }
        if (this.cartSub) {
            this.cartSub.unsubscribe();
        }
    }

    public changeCurrency(currency) {
        this.currency = currency;
    }

    public changeLang(flag) {
        this.flag = flag;
    }
}
