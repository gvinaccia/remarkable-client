import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services';
import { Observable } from 'rxjs/Observable';
import { StorageItem } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  items$: Observable<StorageItem[]>;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage.init();
    this.items$ = this.storage.items$;
  }

}
