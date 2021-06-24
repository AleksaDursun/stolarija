import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private titleService: Title,
  ) {
  }

  public setTitle(title) {
    return this.titleService.setTitle(title);
  }

  public getTitle() {
    return this.titleService.getTitle();
  }

}
