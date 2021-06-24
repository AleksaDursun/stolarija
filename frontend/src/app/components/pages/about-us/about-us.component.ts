import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {MetaService} from '../../shared/services/meta.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
      private meta: MetaService
  ) { }

  ngOnInit() {
    this.meta.addTags([
      {name: 'og:site_name', content: 'Umjetnost u Drvetu'},
      {name: 'og:title', content: 'Prodaja kompjuterske opreme - Umjetnost u Drvetu'},
      {name: 'og:locale', content: 'en_US'},
      {name: 'og:image', content: `${environment.FRONTEND_URL}/assets/images/mLogo.png`},
      {name: 'twitter:image', content: `${environment.FRONTEND_URL}/assets/images/mLogo.png`},
      {name: 'og:type', content: 'article'},
      {name: 'keywords', content: 'računari,kompjuteri,printeri,toneri,monitori,monitor,kompjuter,laptop'},
      {
        name: 'og:description',
        content: 'Umjetnost u Drvetu d.o.o. je kompanija koja se bavi prodajom vrhunske informatičke opreme, ' +
            'te pružanjem inovativnih informatičkih usluga I servisa.'
      },
      {
        name: 'description',
        content: 'Umjetnost u Drvetu d.o.o. je kompanija koja se bavi prodajom vrhunske informatičke opreme, ' +
            'te pružanjem inovativnih informatičkih usluga I servisa.'
      },
      {name: 'og:url', content: environment.FRONTEND_URL + '/pocetna'},
      {name: 'og:image:width', content: '2000'},
      {name: 'og:image:height', content: '1333'},
    ]);
  }

}
