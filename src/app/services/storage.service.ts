import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RawStorageItem, StorageItem, StorageItemId } from '../models';
import { IpcService } from '../electron';
import { IpcMessages } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private items = new BehaviorSubject<StorageItem[]>([]);

  constructor(private ipc: IpcService) { }

  public init() {
    this.ipc.on$(IpcMessages.ITEMS).subscribe((rawItems: RawStorageItem[]) => {
      this.items.next(rawItems.map(this.normalizeRawItem));
    });
    this.ipc.send(IpcMessages.LOAD_ITEMS);
  }

  get items$(): Observable<StorageItem[]> {
    return this.items.asObservable();
  }

  getChildren(node?: StorageItem): Observable<StorageItem[]> {
    return this.items$.pipe(
      map(items => items.filter(item => item.parentId === (node ? node.id : ''))),
    );
  }

  getOne(itemId: StorageItemId): Observable<any> {
    this.ipc.send(IpcMessages.GET_FULL_ITEM, itemId);
    return this.ipc.on$(IpcMessages.ITEM_FULL);
  }

  // noinspection JSMethodCanBeStatic
  private normalizeRawItem(item: RawStorageItem): StorageItem {
    return {
      id: item.ID,
      name: item.VissibleName,
      type: item.Type,
      currentPage: item.CurrentPage,
      isBookmarked: item.Bookmarked,
      parentId: item.Parent,
    };
  }
}
