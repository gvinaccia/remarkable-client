import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpcService } from './ipc.service';
import { WebviewDirective } from './webview.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ WebviewDirective ],
  exports: [ WebviewDirective ],
  providers: [ IpcService ]
})
export class ElectronModule { }
