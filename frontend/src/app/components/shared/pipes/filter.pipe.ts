import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../../models/product.model';
import {StripSpecialCharsPipe} from './strip-special-chars.pipe';

interface Options {
  name?: string;
  is_used?: boolean | string;
  brand?: string;
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  public transform(array: Product[], options: Options): Product[] {
    return FilterPipe.filter(array, options);
  }

  public static filter(array: Product[], options: Options): Product[] {
    let filteredArray = array;
    if (options.is_used !== 'all') {
      const isUsed = options.is_used === 'true';
      filteredArray = filteredArray.filter(item => item.is_used == isUsed);
    }

    if (options.name) {
      filteredArray = filteredArray.filter(item => StripSpecialCharsPipe.strip(item.name).includes(StripSpecialCharsPipe.strip(options.name)) ||
          StripSpecialCharsPipe.strip(item.short_description).includes(StripSpecialCharsPipe.strip(options.name)));
    }

    if (options.brand && options.brand !== 'Svi') {
      filteredArray = filteredArray.filter(item => StripSpecialCharsPipe.strip(item.brand).includes(StripSpecialCharsPipe.strip(options.brand)));
    }

    return filteredArray;
  }

}
