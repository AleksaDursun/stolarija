import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {SimpleImageComponent} from './components/simple-image/simple-image.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import {RouterModule} from '@angular/router';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

@NgModule({
  declarations: [SimpleImageComponent, SingleProductComponent],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    SwiperModule,
    SimpleImageComponent,
    SingleProductComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
