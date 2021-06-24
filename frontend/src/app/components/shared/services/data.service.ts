import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from './api.service';
import {LocalStorageService} from './local-storage.service';
import {ConstService} from './const.service';
import {Category} from '../../../models/category.model';
import {map} from 'rxjs/operators';
import {SidenavMenu} from '../sidebar/sidebar-menu.model';
import {Product} from '../../../models/product.model';
import {HttpResponse} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        private api: ApiService
    ) {
        this.getCategoriesFromApi();
    }

    private categories = new BehaviorSubject<Category[]>([]);

    public get CATEGORIES() {
        return this.categories.asObservable();
    }


    private getCategoriesFromApi(): void {
        this.api.getCategories().subscribe(response => {
            this.setCategories(response);
        });
    }

    public setCategories(data): void {
        this.categories.next(data);
        LocalStorageService.setItem(ConstService.CATEGORIES, JSON.stringify(data));
    }

    public search(term: string, pageNumber?: number): Observable<HttpResponse<Product[]>> {
        return this.api.search(term, pageNumber);
    }

    public get MENU_ITEMS(): Observable<SidenavMenu[]> {
        return this.CATEGORIES.pipe(
            map((categories) => {
                    const menuItems = [];
                    for (const category of categories) {
                        menuItems.push({
                            displayName: category.name,
                            route: !(category['sub_category'] && category.sub_category.length) ?
                                '/pocetna/proizvodi/' + category.name : '',
                            children: this.createSubCategoryMenuItems(category as unknown as Category)
                        });
                    }
                    return menuItems;
                }
            )
        );
    }

    private createSubCategoryMenuItems(category: Category): SidenavMenu[] {

        const filters = (name) => {
            return [
                {
                    displayName: 'Sve',
                    route: '/pocetna/proizvodi/' + name
                },
                {
                    displayName: 'Novo',
                    route: '/pocetna/proizvodi/' + name + '/novo'
                },
                {
                    displayName: 'Korišteno',
                    route: '/pocetna/proizvodi/' + name + '/koristeno'
                }
            ];
        };

        let children = [];
        if (category.sub_category && category.sub_category.length) {

            for (const subCategory of category.sub_category) {
                children.push({
                    displayName: subCategory.name,
                    route: '/pocetna/proizvodi/' + subCategory.name,
                    children: subCategory.have_used_items === 1 ? filters(subCategory.name) : []
                });
            }
        }
        if (category.have_used_items === 1) {
            children.push(
                ...filters(category.name)
            );
        }
        return children;
    }

    public getProductsOnSale(): Observable<HttpResponse<Product[]>> {
        return this.api.getProductsOnSale();
    }

    public getCarouselProducts(): Observable<HttpResponse<Product[]>> {
        return this.api.getCarouselProducts();
    }

    public getProduct(id): Observable<HttpResponse<Product[]>> {
        return this.api.getProduct(id);
    }
}
