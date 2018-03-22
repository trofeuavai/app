import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AngularFirestore } from 'angularfire2/firestore';
import {Upload} from './upload-team';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  file: File;
  fileName: string = null;
  teamName: string;
  image: string;
  currentUpload: Upload;
  preview: any;
  showOld: any;
  showNew: any;
  storageRef: any;
  team: any;
  filenotempty: any;


  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) {
    console.log(this.route.snapshot.params['id']);
    this.showOld = true;
    this.showNew = false;
    
   }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.team = this.db.object('teams/'+ this.route.snapshot.params['id']).valueChanges();
    this.showOld = true;
    this.showNew = false;
    this.filenotempty = false;
  }

  fullStore(photo){
    let nome = this.teamName;
    let nomeFile = this.fileName;
    this.firebase.database().ref("teams/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        photo: photo,
        fileName: nomeFile
      }
    );

  }

  store(name, photo, fileName){
    let nome = name;
    let photoOld = photo;
    let fileNameOld = fileName;
    this.firebase.database().ref("teams/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        photo: photoOld,
        fileName: fileNameOld
      }
    );
  }

  onSubmit(form){
    if(this.fileName){
      this.teamName = form.value.name;
      this.storageRef.child(this.fileName).getDownloadURL().then(photo => this.fullStore(photo));
      this.router.navigate(['/team']);
    }else{
      let name = null;
      let fileName = null;
      let photo = null;
      this.firebase.database().ref("teams/"+ this.route.snapshot.params['id']).on('value', function(snap){
        fileName = snap.val().fileName;
        photo = snap.val().photo;
      });
      this.teamName = form.value.name;
      name = this.teamName;
      this.store(name, photo, fileName);

      
      this.router.navigate(['/team']);
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
    this.filenotempty = true;
  }

}
