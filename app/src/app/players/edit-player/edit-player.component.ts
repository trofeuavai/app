import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AngularFirestore } from 'angularfire2/firestore';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  file: File;
  fileName: string = null;
  playerName: string;
  playerPosition: string;
  image: string;
  preview: any;
  showOld: any;
  showNew: any;
  storageRef: any;
  player: any;
  positions: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) { 
    console.log(this.route.snapshot.params['id']);
    this.showOld = true;
    this.showNew = false;
  }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.player = this.db.object('players/'+ this.route.snapshot.params['id']).valueChanges();
    this.positions = this.db.list('positions').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.showOld = true;
    this.showNew = false;
  }

  fullStore(photo){
    let nome = this.playerName;
    let posicao = this.playerPosition;
    let nomeFile = this.fileName;
    this.firebase.database().ref("players/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        position: posicao,
        photo: photo,
        fileName: nomeFile
      }
    );

  }

  store(name, position, photo, fileName){
    let nome = name;
    let posicao = position;
    let photoOld = photo;
    let fileNameOld = fileName;
    this.firebase.database().ref("players/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        position: posicao,
        photo: photoOld,
        fileName: fileNameOld
      }
    );
  }

  onSubmit(form){
    if(this.fileName){
      this.playerName = form.value.name;
      this.playerPosition = form.value.position;
      this.storageRef.child(this.fileName).getDownloadURL().then(photo => this.fullStore(photo));
      this.router.navigate(['/players']);
    }else{
      let name = null;
      let fileName = null;
      let position = null;
      let positionOld = null;
      let photo = null;
      this.firebase.database().ref("players/"+ this.route.snapshot.params['id']).on('value', function(snap){
        fileName = snap.val().fileName;
        photo = snap.val().photo;
        positionOld = snap.val().position;
      });
      console.log(fileName);
      this.playerName = form.value.name;
      this.playerPosition = form.value.position;
      name = this.playerName;
      console.log('position old: '+form.value.position);
      if(form.value.position!=""){
        position = this.playerPosition;
      }else{
        position = positionOld;
      }
      this.store(name, position, photo, fileName);

      
      this.router.navigate(['/players']);
    }
  }

  detectFile(event){
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.preview = this.storageRef.child(this.fileName).put(this.file).then(function(result){
      if(result.state=='success'){
        return result.downloadURL;
      }
    });
    this.showOld = false;
    this.showNew = true;
  }

}
