import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageItem } from '../../models';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.sass']
})
export class FileBrowserComponent {

  @Input()
  items: StorageItem[];

  @Output()
  selected = new EventEmitter<StorageItem>();

}

