import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { StorageService } from '../../services';
import { StorageItem } from '../../shared';

const sortByType = (a: StorageItem, b: StorageItem) => {
  if (a.type === b.type) {
    return 0;
  }
  return a.type === 'CollectionType' ? -1 : 1;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  items$: Observable<StorageItem[]>;

  currentNode = new BehaviorSubject<StorageItem|undefined>(undefined);

  constructor(
    private storage: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.storage.init();
    this.items$ = this.currentNode.asObservable().pipe(
      switchMap(node => this.storage.getChildren(node)),
      map(items => items.sort(sortByType))
    );
  }

  onNodeSelected(node: StorageItem) {
    if (node.type === 'CollectionType') {
      this.currentNode.next(node);
    } else {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigateByUrl(`document/${node.id}`);
    }
  }

}
