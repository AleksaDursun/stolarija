import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pocetna'
  },
  {
    path: '',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'info/404'
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
