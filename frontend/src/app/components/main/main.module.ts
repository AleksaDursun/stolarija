import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
            path: 'pocetna',
            loadChildren: () => import('../../components/shop/shop.module').then(m => m.ShopModule)
          },
          {
            path: 'info',
            loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
          },
          {
            path: 'blog',
            loadChildren: () => import('../../components/blog/blog.module').then(m => m.BlogModule)
          },
        ]
      },
    ])
  ]
})
export class MainModule {
}
