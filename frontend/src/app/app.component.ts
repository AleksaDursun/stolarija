import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Settings, AppSettings } from './components/shared/services/color-option.service';
import { Router, NavigationEnd } from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {SchemaService} from './components/shared/services/schema.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ecommerce-sophia-new';
  public settings: Settings;
  public url: any;

  constructor(
      private spinner: NgxSpinnerService,
      public appSettings: AppSettings,
      public router: Router,
      public schemaService: SchemaService,
      @Inject(PLATFORM_ID) private platformId
  ) {
    this.settings = this.appSettings.settings;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } );
  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      /** spinner starts on init */
      this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
      document.documentElement.style.setProperty('--theme-deafult', '#b8860b');
    }
  }

  public siteLinks() {
    return this.schemaService.siteLinksJson();
  }

  public setLogo() {
    return this.schemaService.setLogo();
  }

}
