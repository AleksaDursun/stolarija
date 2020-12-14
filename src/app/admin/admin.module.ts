import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTES} from './admin.routing';
import { AddProductComponent } from './admin-panel/add-product/add-product.component';
import { EditProductComponent } from './admin-panel/edit-product/edit-product.component';
import { EditCategoryComponent } from './admin-panel/edit-category/edit-category.component';
import { AddCategoryComponent } from './admin-panel/add-category/add-category.component';
import { ProductFormComponent } from './admin-panel/forms/product-form/product-form.component';
import { CategoryFormComponent } from './admin-panel/forms/category-form/category-form.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AdminPanelComponent, AdminLoginComponent, AddProductComponent, EditProductComponent, EditCategoryComponent, AddCategoryComponent, ProductFormComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class AdminModule { }
