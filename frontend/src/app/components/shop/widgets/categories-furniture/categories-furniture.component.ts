import {Component, Input, OnInit} from '@angular/core';
import {SidenavMenu} from '../../../shared/sidebar/sidebar-menu.model';
import {DataService} from '../../../shared/services/data.service';
import {SidebarMenuService} from '../../../shared/sidebar/sidebar-menu.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-categories-furniture',
  templateUrl: './categories-furniture.component.html',
  styleUrls: ['./categories-furniture.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
          animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class CategoriesFurnitureComponent implements OnInit {
  categories: SidenavMenu[];
  expanded: boolean;
  // @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavMenu;
  @Input() depth: number;

  constructor(private sidenavMenuService: SidebarMenuService, public router: Router, private dataService: DataService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.sidenavMenuService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        // this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }
  onItemSelected(item: SidenavMenu) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]).then();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

}
