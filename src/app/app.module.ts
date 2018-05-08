import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ElectronModule } from './electron/electron.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
