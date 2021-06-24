import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

var document = {};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
  }

  static getItem(key) {
    if (typeof localStorage != 'undefined' && typeof localStorage != null) {
      return localStorage.getItem(key);
    } else {
      return document[key];
    }
  }

  static setItem(key, value) {
    if (typeof localStorage != 'undefined' && typeof localStorage != null) {
      return localStorage.setItem(key, value);
    } else {
      return  document[key] = value;
    }
  }

  static removeItem(key) {
    if (typeof localStorage != 'undefined' && typeof localStorage != null) {
      return localStorage.removeItem(key);
    } else {
      return document[key] = '';
    }
  }

  static clear() {
    if (typeof localStorage != 'undefined' && typeof localStorage != null) {
      return localStorage.clear();
    } else {
      // @ts-ignore
      return document = {};
    }
  }

}
