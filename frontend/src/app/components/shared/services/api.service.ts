import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.API_URL;
  private PATHS = {
    categories: '/categories',
    subscribers: '/subscribers',
    orders: '/orders',
    products: '/products'
  };

  get headers() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin' : '*'
    });
  }

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<object> {
    return this.http.get(this.apiUrl + this.PATHS.categories);
  }

  public subscribeToNewsletter(newsletterData): Observable<object> {
    return this.http.post(this.apiUrl + this.PATHS.subscribers, newsletterData, {headers: this.headers});
  }

  public placeOrder(order): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + this.PATHS.orders, order, {headers: this.headers, observe: 'response'});
  }

  public search(term: string, pageNumber: number): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.apiUrl + this.PATHS.products + '?search=' + term + (pageNumber ? '&page=' + pageNumber : '&disablePagination=true'), {observe: 'response'});
  }

  public getProductsOnSale(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.apiUrl + this.PATHS.products + '?isSale=1', {observe: 'response'});
  }

  public getCarouselProducts(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.apiUrl + this.PATHS.products + '?isCarousel=1', {observe: 'response'});
  }

  public getProduct(id): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.apiUrl + this.PATHS.products + '?id=' + id, {observe: 'response'});
  }
}
