import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Messages, Notebook, RawStorageItem, StorageItem, StorageItemId } from '../shared';
import { IpcService } from '../electron';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private items = new BehaviorSubject<StorageItem[]>([]);
  private itemsById = new Map<string, StorageItem>();

  constructor(private ipc: IpcService) { }

  public init() {
    this.ipc.on$(Messages.ITEMS).subscribe((rawItems: RawStorageItem[]) => {
      const normalizedItems = rawItems.map(this.normalizeRawItem);
      normalizedItems.forEach(item => this.itemsById.set(item.id, item));
      this.items.next(normalizedItems);
    });
    this.ipc.send(Messages.LOAD_ITEMS);
  }

  get items$(): Observable<StorageItem[]> {
    return this.items.asObservable();
  }

  getChildren(node?: StorageItem): Observable<StorageItem[]> {
    return this.items$.pipe(
      map(items => items.filter(item => item.parentId === (node ? node.id : ''))),
    );
  }

  getOne(itemId: StorageItemId): Observable<Notebook> {
    this.ipc.send(Messages.GET_FULL_ITEM, itemId);
    return this.ipc.on$(Messages.ITEM_FULL).pipe(
      take(1),
      map(result => {
        return {
          ...this.itemsById.get(itemId),
          pages: result.pages,
          content: result.contentData,
        };
      }),
      tap(console.log)
    );
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
