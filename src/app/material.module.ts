import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

const components = [
  MatSidenavModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule { }
