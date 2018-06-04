import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.sass']
})
export class DocumentComponent implements OnInit {

  pages$: Observable<any>;
  document$: Observable<any>;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.document$ = this.route.params.pipe(
      map(p => p.id),
      switchMap(id => this.storage.getOne(id))
    );

    this.pages$ = this.document$.pipe(map(d => d.pages));
  }

}
