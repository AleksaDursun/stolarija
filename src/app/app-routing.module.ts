import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routing';



@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    scrollPositionRestoration: 'disabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

