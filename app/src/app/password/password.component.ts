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
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase, private router: Router, private firebase: FirebaseApp, private db: AngularFireDatabase) { }

  showDone: any;
  showErr: any;
  showEqPass: any;
  storageRef: any;

  ngOnInit() {
    this.showDone = false;
    this.showErr = false;
    this.showEqPass = false;
  }

  onSubmit(form) {
    let pass = form.value.password;
    let confirmpass = form.value.confirmpassword;
    if (pass == confirmpass) {
      this.firebase.database().ref("/").update(
        {
          password: pass
        }
      ).then(e => this.showMessages("showDone")).catch(c => this.showMessages("showErr"));
    } else {
      this.showMessages("showEqPass");
    }

    form.reset();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showMessages(msg){
    if(msg=="showDone"){
      this.showDone = true;
      await this.delay(3000);
      this.showDone = false;
    }
    if(msg=="showErr"){
      this.showErr = true;
      await this.delay(3000);
      this.showErr = false;
    }

    if(msg=="showEqPass"){
      this.showEqPass = true;
      await this.delay(3000);
      this.showEqPass = false;
    }
  }

}
