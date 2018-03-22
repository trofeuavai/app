import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  match;
  storageRef: any;
  teams: any;
  selected: any;
  list: any[] = [];
  playersMatch: Observable<any[]>;
  coaches: any;
  referees: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) { }

  ngOnInit() {
    this.match = this.db.object('matches/' + this.route.snapshot.params['id']).valueChanges();

    

    this.storageRef = this.firebase.storage().ref();
    this.teams = this.db.list('teams').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.playersMatch = this.db.list('matches/' + this.route.snapshot.params['id']+ '/players').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });

    this.list.push(this.playersMatch);
    this.selected = true;

  }

  onSubmit(form) {
    let teamOld = null;
    let opponentOld = null;
    let strategyOld = null;
    this.firebase.database().ref("matches/"+ this.route.snapshot.params['id']).once('value', function(snap){
      teamOld = snap.val().team;
      opponentOld = snap.val().opponent;
      strategyOld = snap.val().strategy;
    });

    if(form.value.team=="" && form.value.opponent=="" && form.value.strategy==""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: teamOld,
        opponent: opponentOld,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: strategyOld
      });
    }else if(form.value.team=="" && form.value.opponent=="" && form.value.strategy!=""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: teamOld,
        opponent: opponentOld,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: form.value.strategy
      });
    }else if(form.value.team=="" && form.value.opponent!="" && form.value.strategy==""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: teamOld,
        opponent: form.value.opponent,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: strategyOld
      });
    }else if(form.value.team!="" && form.value.opponent=="" && form.value.strategy==""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: form.value.team,
        opponent: opponentOld,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: strategyOld
      });
    }else if(form.value.team=="" && form.value.opponent!="" && form.value.strategy!=""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: teamOld,
        opponent: form.value.opponent,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: form.value.strategy
      });
    }else if(form.value.team!="" && form.value.opponent=="" && form.value.strategy!=""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: form.value.team,
        opponent: opponentOld,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: form.value.strategy
      });
    }else if(form.value.team!="" && form.value.opponent!="" && form.value.strategy==""){
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: teamOld,
        opponent: opponentOld,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: form.value.strategy
      });
    }else{
      this.db.database.ref('matches/' + this.route.snapshot.params['id']).update({
        team: form.value.team,
        opponent: form.value.opponent,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: form.value.strategy
      });
    }

    this.router.navigate(['/matches']);

  }

}
