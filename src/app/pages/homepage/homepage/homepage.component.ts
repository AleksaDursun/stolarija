import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {


  constructor() {
  }

  ngAfterViewInit(): void {
    $('#bannerCarousel').carousel({wrap: false, pause: false, interval: 1500});
  }

}
