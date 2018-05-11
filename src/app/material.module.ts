import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

const components = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule { }
