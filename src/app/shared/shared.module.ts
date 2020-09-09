import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
