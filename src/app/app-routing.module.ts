import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromPages from './pages';

const routes: Routes = [
  {
    path: '',
    component: fromPages.DashboardComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
