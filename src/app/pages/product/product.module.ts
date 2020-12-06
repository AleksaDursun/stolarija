import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTES} from './product.routing';
import { RelatedProductsComponent } from './product/related-products/related-products.component';



@NgModule({
  declarations: [ProductComponent, RelatedProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ProductModule { }
