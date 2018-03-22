import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import 'firebase/storage';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { database } from 'firebase/app';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];
  players: Observable<any[]>;
  playersList: any[] = [];
  storageRef: any;
  num: any;
  foto: any;
  nome: any;
  posicao: any;

  constructor(private paginationService: PaginationService, private db: AngularFireDatabase, private firebase: FirebaseApp) { }


  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.players = this.db.list('players').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.firebase.database().ref("players/").once('value', data => this.getPlayers(data), this.errData);

    this.allItems.push(this.players);
    this.setPage(1);

  }

  getPlayers(data){
    if(data.val()){
      this.nome = data.val().name;
      this.foto = data.val().photo;
      this.posicao = data.val().position;
    }
  }

  errData(){

  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  deleteItem(item){
    const itemsRef = this.db.list('players');
    itemsRef.remove(item.key);
    let deleteRef = this.storageRef.child(item.fileName);
    deleteRef.delete().then(function() {
      console.log('arquivo deletado');
    }).catch(function(error) {
      console.log('erro ao deletar arquivo');
    });
    
  }

}
