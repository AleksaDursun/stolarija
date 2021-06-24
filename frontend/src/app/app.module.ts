import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { ColorOptionsComponent } from './components/color-options/color-options.component';


@NgModule({
  declarations: [
    AppComponent,
    ColorOptionsComponent
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxImgZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
