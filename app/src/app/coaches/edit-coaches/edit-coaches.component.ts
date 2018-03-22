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
  selector: 'app-edit-coaches',
  templateUrl: './edit-coaches.component.html',
  styleUrls: ['./edit-coaches.component.css']
})
export class EditCoachesComponent implements OnInit {

  file: File;
  fileName: string = null;
  coachName: string;
  image: string;
  preview: any;
  showOld: any;
  showNew: any;
  storageRef: any;
  coach: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) { 
    console.log(this.route.snapshot.params['id']);
    this.showOld = true;
    this.showNew = false;
  }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.coach = this.db.object('coaches/'+ this.route.snapshot.params['id']).valueChanges();
    this.showOld = true;
    this.showNew = false;
  }

  fullStore(photo){
    let nome = this.coachName;
    let nomeFile = this.fileName;
    this.firebase.database().ref("coaches/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        photo: photo,
        position: 'tecnico',
        fileName: nomeFile
      }
    );
  }

  store(name,  photo, fileName){
    let nome = name;
    let photoOld = photo;
    let fileNameOld = fileName;
    this.firebase.database().ref("coaches/"+ this.route.snapshot.params['id']).set(
      {
        name: nome,
        photo: photoOld,
        position: 'tecnico',
        fileName: fileNameOld
      }
    );
  }

  onSubmit(form){
    if(this.fileName){
      this.coachName = form.value.name;
      this.storageRef.child(this.fileName).getDownloadURL().then(photo => this.fullStore(photo));
      this.router.navigate(['/coaches']);
    }else{
      let name = null;
      let fileName = null;
      let photo = null;
      this.firebase.database().ref("coaches/"+ this.route.snapshot.params['id']).on('value', function(snap){
        fileName = snap.val().fileName;
        photo = snap.val().photo;
      });
      this.coachName = form.value.name;
      name = this.coachName;
      this.store(name, photo, fileName);

      
      this.router.navigate(['/coaches']);
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
