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

@Component({
  selector: 'app-add-referees',
  templateUrl: './add-referees.component.html',
  styleUrls: ['./add-referees.component.css']
})
export class AddRefereesComponent implements OnInit {

  file: File;
  fileName: string;
  refereeName: string;
  image: string;
  preview: any;
  show: any;
  storageRef: any;

  constructor(private angularFire: AngularFireDatabase, private router: Router, private firebase: FirebaseApp) { }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.show = false; 
  }

  store(url){
    let nome = this.refereeName;
    let nomeFile = this.fileName;
    this.angularFire.list("referees").push(
      {
        name: nome,
        photo: url,
        position: 'arbitro',
        fileName: nomeFile
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);

  }

  onSubmit(form){
    this.refereeName = form.value.name;
    this.storageRef.child(this.fileName).getDownloadURL().then(url => this.store(url));

    this.router.navigate(['/referees']);
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
  }

}