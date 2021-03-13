import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {

  constructor() { }

  public static get CATEGORIES(): string {
    return 'categories';
  }
}
