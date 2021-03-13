import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'home',
            loadChildren: () => import('../../components/shop/shop.module').then(m => m.ShopModule)
          },
          {
            path: 'info',
            loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)

          },
        ]
      },
    ])
  ]
})
export class MainModule { }
