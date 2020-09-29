import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {SimpleImageComponent} from './components/simple-image/simple-image.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

@NgModule({
  declarations: [SimpleImageComponent],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports: [
    SwiperModule,
    SimpleImageComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
