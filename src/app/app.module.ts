import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaptchaTileComponent } from './captcha-tile/captcha-tile.component';
import { CaptchaGridComponent } from './captcha-grid/captcha-grid.component';
import { ImageResultComponent } from './image-result/image-result.component';
import { MatrixComponent } from './matrix/matrix.component';
import { ResultTableComponent } from './result-table/result-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CaptchaTileComponent,
    CaptchaGridComponent,
    ImageResultComponent,
    MatrixComponent,
    ResultTableComponent
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
