import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ElectronModule } from './electron/electron.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import * as fromPages from './pages';
import * as fromComponents from './components';
import * as fromGuards from './guards';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ...fromPages.all,
    ...fromComponents.all,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ElectronModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    ...fromGuards.all
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
