import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass'],
})
export class MainLayoutComponent implements OnInit {

  sidenavOpened = true;

  constructor() { }


  ngOnInit() {
  }

  // noinspection JSMethodCanBeStatic
  setTheme(name: string) {
    document.body.classList.remove('theme-dark');
    document.body.classList.remove('theme-light');
    document.body.classList.add(`theme-${name}`);
  }
}
