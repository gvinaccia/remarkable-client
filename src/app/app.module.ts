import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ElectronModule } from './electron/electron.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import * as fromPages from './pages';

@NgModule({
  declarations: [
    AppComponent,
    ...fromPages.all,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ElectronModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
