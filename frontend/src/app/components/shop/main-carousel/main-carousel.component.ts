import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SwiperConfigInterface, SwiperPaginationInterface} from 'ngx-swiper-wrapper';
import {DataService} from '../../shared/services/data.service';
import {Product} from '../../../models/product.model';
import {Slide} from '../../../models/slide.model';

@Component({
    selector: 'app-main-carousel',
    templateUrl: './main-carousel.component.html',
    styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit, AfterViewInit {

    slides: Slide[];
    public config: SwiperConfigInterface = {};

    private pagination: SwiperPaginationInterface = {
        el: '.swiper-pagination',
        clickable: true
    };

    constructor(
        private dataService: DataService
    ) {
    }

    ngOnInit() {
        this.slides = [
          {
            image_url: 'assets/images/carousel/banner1.jpg',
            name: 'Crkveni Proizvodi',
            link: '/pocetna/proizvodi/crkveni%20proizvodi'
          },
          {
            image_url: 'assets/images/carousel/banner3.JPG',
            name: 'Sto orah masiva',
            link: '/pocetna/proizvodi/stolovi'
          },
          {
            image_url: 'assets/images/carousel/banner4.jpg',
            name: 'Luksuzni kundaci',
            link: '/pocetna/proizvodi/kundaci'
          },
          {
            image_url: 'assets/images/carousel/banner2.jpg',
            name: 'Podloge za lovačke trofeje',
            link: '/pocetna/proizvodi/podloge'
          },
        ];
    }

    ngAfterViewInit() {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            initialSlide: 5,
            keyboard: true,
            navigation: true,
            pagination: this.pagination,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: 'slide'
        };
    }


}
