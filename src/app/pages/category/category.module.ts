import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import {SharedModule} from '../../shared/shared.module';
import {ROUTES} from './category/categoty.routing';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class CategoryModule { }
