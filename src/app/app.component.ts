import { Component } from '@angular/core';
import { IpcService } from './electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  sidenavOpened = true;

  items = [];

  constructor(private ipc: IpcService) {
    ipc.on$('items').subscribe(v => this.items = v);
  }

  setTheme(name: string) {
    document.body.classList.remove('theme-dark');
    document.body.classList.remove('theme-light');
    document.body.classList.add(`theme-${name}`);
  }

}
