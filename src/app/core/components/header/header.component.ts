import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  headerClass: string;

  constructor(
    private router: Router
  ) {
    this.determineClass();
  }

  determineClass(): void {
    this.router.events.subscribe(e => {
      if (this.router.url === '' || this.router.url === '/home') {
        this.headerClass = 'no-background';
      } else {
        this.headerClass = 'background shadow-light';
      }
    });
  }

}
