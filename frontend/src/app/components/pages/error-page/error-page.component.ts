import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {MetaService} from '../../shared/services/meta.service';
import {environment} from '../../../../environments/environment';
import {REQUEST, RESPONSE} from '@nguniversal/express-engine/tokens';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {


  constructor(
      @Optional() @Inject(REQUEST) private request: Request,
      @Optional() @Inject(RESPONSE) private response: Response,
      @Inject(PLATFORM_ID) private platformId: any,
      private meta: MetaService
  ) {
    if (isPlatformServer(this.platformId)) {
      // @ts-ignore
      this.response.status(404);
    }
  }
  ngOnInit() {
    this.meta.addTags([
      {name: 'og:site_name', content: 'Umjetnost u Drvetu'},
      {name: 'og:title', content: 'Stranica nije pronađena  - Umjetnost u Drvetu'},
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
