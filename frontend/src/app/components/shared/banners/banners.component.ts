import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

    banners: Array<any> = [
        {
            image: 'assets/images/banners/banner1.jpg',
            title: 'Hristov Grob',
            url: '/pocetna/proizvodi/crkveni%20proizvodi'
        },
        {
            image: 'assets/images/banners/banner3.JPG',
            title: 'Sto orah masiva',
            url: '/pocetna/proizvodi/stolovi'
        },
        {
            image: 'assets/images/banners/banner4.jpg',
            title: 'Luksuzni kundaci',
            url: '/pocetna/proizvodi/kundaci'
        },
        {
            image: 'assets/images/banners/banner2.jpg',
            title: 'Podloge za lovačke trofeje',
            zurl: '/pocetna/proizvodi/podloge'
        },
    ];
    contentLoaded = false;

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.contentLoaded = true;
        }, 1000);
    }

    public getBanner(index) {
        return this.banners[index];
    }

    public getBgImage(index) {
        let bgImage = {
            'background-image': index != null ? "url(" + this.banners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
        };
        return bgImage;
    }
}
