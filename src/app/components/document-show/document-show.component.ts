import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Notebook } from '../../shared';

@Component({
  selector: 'app-document-show',
  templateUrl: './document-show.component.html',
  styleUrls: ['./document-show.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentShowComponent implements OnInit {

  @Input()
  document: Notebook;

  constructor() { }

  ngOnInit() { }

}
