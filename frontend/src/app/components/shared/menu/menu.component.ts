import {Component, OnDestroy} from '@angular/core';
import {DataService} from '../services/data.service';
import {SidenavMenu} from '../sidebar/sidebar-menu.model';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy{

    public categories: SidenavMenu[];
    private readonly menuItemsSub: Subscription;

    constructor(private dataService: DataService) {
       this.menuItemsSub = this.dataService.MENU_ITEMS.subscribe(items => {
            this.categories = items;
        });
    }

    ngOnDestroy() {
        const unsubscribe = this.menuItemsSub ? this.menuItemsSub.unsubscribe() : false;
    }

    openMegaMenu() {
        let pane = document.getElementsByClassName('cdk-overlay-pane');
        [].forEach.call(pane, (el) => {
            if (el.children.length > 0) {
                if (el.children[0].classList.contains('mega-menu')) {
                    el.classList.add('mega-menu-pane');
                }
            }
        });
    }
}
