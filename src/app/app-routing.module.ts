import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromPages from './pages';

const routes: Routes = [
  {
    path: '',
    component: fromPages.DashboardComponent
  },
  {
    path: 'document/:id',
    component: fromPages.DocumentComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
