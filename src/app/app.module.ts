import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaptchaTileComponent } from './captcha-tile/captcha-tile.component';
import { CaptchaGridComponent } from './captcha-grid/captcha-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    CaptchaTileComponent,
    CaptchaGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
