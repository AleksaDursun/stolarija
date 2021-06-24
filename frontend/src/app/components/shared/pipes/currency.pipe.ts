import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number | string, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): unknown {
    if (!value) {
      value = 0;
    }
    return (typeof value !== 'string' ? value.toFixed(2) : parseFloat(value).toFixed(2)) + ' ' + currencyCode;
  }

}
