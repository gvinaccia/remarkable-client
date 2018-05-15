import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RawStorageItem, StorageItem } from '../models';
import { IpcService } from '../electron';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private items = new BehaviorSubject<StorageItem[]>([]);

  constructor(private ipc: IpcService) { }

  public init() {
    this.ipc.on$('items').subscribe((rawItems: RawStorageItem[]) => {
      this.items.next(rawItems.map(this.normalizeRawItem));
    });
    this.ipc.send('load_items');
  }

  get items$(): Observable<StorageItem[]> {
    return this.items.asObservable();
  }

  // noinspection JSMethodCanBeStatic
  private normalizeRawItem(item: RawStorageItem): StorageItem {
    return {
      id: item.ID,
      name: item.VissibleName,
      type: item.Type,
    };
  }
}
