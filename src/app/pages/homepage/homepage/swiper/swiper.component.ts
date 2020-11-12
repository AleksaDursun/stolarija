import { Component, OnInit } from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  config: SwiperConfigInterface;
   bgImg = '/assets/images/banner/1.jpeg';
   bgImg2 = '/assets/images/banner/2.jpeg';

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
          slidesPerView: 2,
        },
        1700: {
          slidesPerView: 2
        }
      }
    };
  }

}
