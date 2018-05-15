import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  sidenavOpened = true;

  // noinspection JSMethodCanBeStatic
  setTheme(name: string) {
    document.body.classList.remove('theme-dark');
    document.body.classList.remove('theme-light');
    document.body.classList.add(`theme-${name}`);
  }

}
