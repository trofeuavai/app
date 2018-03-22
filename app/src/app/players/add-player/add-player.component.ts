import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router'
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'firebase/storage';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  file: File;
  fileName: string;
  playerName: string;
  playerPosition: string;
  image: string;
  preview: any;
  show: any;
  storageRef: any;
  positions: any;
  filenotempty: any;


  constructor(private angularFire: AngularFireDatabase, private router: Router, private firebase: FirebaseApp, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.show = false;
    this.positions = this.db.list('positions').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.filenotempty = false;
    
  }


  store(url){
    let nome = this.playerName;
    let posicao = this.playerPosition;
    let nomeFile = this.fileName;
    this.angularFire.list("players").push(
      {
        name: nome,
        position: posicao,
        photo: url,
        fileName: nomeFile
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);

      
  }

  onSubmit(form){
    console.log(form);
    
    this.playerName = form.value.name;
    this.playerPosition = form.value.position;
    this.storageRef.child(this.fileName).getDownloadURL().then(url => this.store(url));

    this.router.navigate(['/players']);
  }

  detectFile(event){
    
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.preview = this.storageRef.child(this.fileName).put(this.file).then(function(result){
      if(result.state=='success'){
        return result.downloadURL;
      }
    });
    this.show = true;
    this.filenotempty = true;
  }

}
