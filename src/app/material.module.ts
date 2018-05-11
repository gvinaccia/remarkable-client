import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';

const components = [
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule { }
