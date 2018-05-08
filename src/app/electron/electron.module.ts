import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpcService } from './ipc.service';

@NgModule({
  imports: [ CommonModule ],
  providers: [ IpcService ]
})
export class ElectronModule { }
