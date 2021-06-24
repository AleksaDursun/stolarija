import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'o-nama', component: AboutUsComponent },
      { path: 'kontakt', component: ContactComponent },
      { path: 'omiljeno', component: WishlistComponent },
      { path: '404', component: ErrorPageComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
