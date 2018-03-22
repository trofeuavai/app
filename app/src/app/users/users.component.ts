import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  users: Observable<any[]>;

  constructor(private paginationService: PaginationService, private db: AngularFireDatabase) {
    
  }

  ngOnInit() {
    this.users = this.db.list('users').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.allItems.push(this.users);
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
    const itemsRef = this.db.list('users');
    itemsRef.remove(item.key);
  }

}
