import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {SimpleImageComponent} from './components/simple-image/simple-image.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import {RouterModule} from '@angular/router';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {CategoriesAndProductsService} from './services/categories-and-products.service';
import {LocalStorageService} from './services/local-storage.service';
import {ConstService} from './services/const.service';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

@NgModule({
  declarations: [SimpleImageComponent, SingleProductComponent, ImageUploadComponent],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    AngularFireStorageModule,
    NgxDropzoneModule
  ],
  exports: [
    SwiperModule,
    SimpleImageComponent,
    SingleProductComponent,
    ImageUploadComponent
  ],
  providers: [
    CategoriesAndProductsService,
    LocalStorageService,
    ConstService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SharedModule { }
