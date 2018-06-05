import { Component, Input, OnInit } from '@angular/core';
import { StorageItem } from '../../shared';

@Component({
  selector: 'app-item-proxy',
  templateUrl: './item-proxy.component.html',
  styleUrls: ['./item-proxy.component.sass']
})
export class ItemProxyComponent implements OnInit {

  @Input()
  item: StorageItem;

  constructor() { }

  ngOnInit() {
  }

}
