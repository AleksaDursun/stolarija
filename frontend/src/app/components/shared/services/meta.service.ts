import { Injectable } from '@angular/core';
import {Meta, MetaDefinition} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
      private meta: Meta
  ) { }

  public addTags(tags: MetaDefinition[]): void {
    this.meta.addTags(tags);
  }

}
