import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {SharedModule} from '../../shared/shared.module';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {RouterModule} from '@angular/router';
import { SwiperComponent } from './homepage/swiper/swiper.component';
import { CategoriesAndProductsComponent } from './homepage/categories-and-products/categories-and-products.component';
import {ROUTES} from './home.routing';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

@NgModule({
  declarations: [HomepageComponent, SwiperComponent, CategoriesAndProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SwiperModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class HomepageModule { }