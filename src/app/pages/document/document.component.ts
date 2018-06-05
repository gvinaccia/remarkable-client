import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StorageService } from '../../services';
import { Notebook } from '../../shared';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.sass']
})
export class DocumentComponent implements OnInit {

  document$: Observable<Notebook>;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.document$ = this.route.params.pipe(
      map(p => p.id),
      switchMap(id => this.storage.getOne(id))
    );
  }

}
