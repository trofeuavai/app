import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  storageRef: any;
  teams: any;

  constructor(private angularFire: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) { }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.teams = this.angularFire.list('teams').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  onSubmit(form){
    this.angularFire.list("matches").push(
      {
        team: form.value.team,
        opponent: form.value.opponent,
        score: form.value.score,
        stadium: form.value.stadium,
        championship: form.value.championship,
        round: form.value.round,
        date: form.value.date,
        strategy: form.value.strategy,
        average: 0
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);

      this.router.navigate(['/matches']);
  }

}
