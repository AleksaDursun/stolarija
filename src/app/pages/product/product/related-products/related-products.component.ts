import {Component, Input, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {Product} from '../../../../shared/dataModels/product.interface';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  config: SwiperConfigInterface;
  @Input() products: Product[];

  constructor() { }

  ngOnInit(): void {
    this.config = {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 20,
      mousewheel: true,
      autoplay: {
        delay: 3000,
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        slideShadows: false,
        depth: 0
      },
      breakpoints: {
        991: {
          slidesPerView: 3,
        },
        1700: {
          slidesPerView: 3
        }
      }
    };
  }

}
