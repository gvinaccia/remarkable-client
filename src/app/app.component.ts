import { Component } from '@angular/core';
import { IpcService } from './electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  items = [];

  constructor(private ipc: IpcService) {
    ipc.on$('items').subscribe(v => this.items = v);
  }

}
