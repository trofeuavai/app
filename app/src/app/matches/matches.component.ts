import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  matches: Observable<any[]>;

  constructor(private paginationService: PaginationService, private db: AngularFireDatabase) { }


  ngOnInit() {
    this.matches = this.db.list('matches').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.allItems.push(this.matches);
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  deleteItem(item){
    const itemsRef = this.db.list('matches');
    itemsRef.remove(item.key);
  }


}
