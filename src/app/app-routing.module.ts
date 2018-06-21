import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromPages from './pages';
import { DeviceRegisteredGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromPages.MainLayoutComponent,
    canActivate: [ DeviceRegisteredGuard ],
    children: [
      {
        path: '',
        component: fromPages.DashboardComponent,
      },
      {
        path: 'document/:id',
        component: fromPages.DocumentComponent
      },
    ]
  },
  {
    path: 'register',
    component: fromPages.RegisterDeviceComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
