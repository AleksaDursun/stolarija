import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripSpecialChars'
})
export class StripSpecialCharsPipe implements PipeTransform {

  public static strip(value: any, args?: any) {
    return value ? value.toString().toLowerCase().trim().replace(/&/g, '-and-').replace(/[\s\W-]+/g, '-') : '';
  }

  transform(value: any, args?: any): any {
   return StripSpecialCharsPipe.strip(value);
  }

}
