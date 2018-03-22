import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  user;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router) { 
    console.log(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.user = this.db.object('users/'+ this.route.snapshot.params['id']).valueChanges();
  }

  onSubmit(form){
    // this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    // .map(res => res)
    // .subscribe(dados => console.log);

    this.db.database.ref('users/'+ this.route.snapshot.params['id']).set({
        name: form.value.name,
        login: form.value.login,
        password: form.value.password,
        confirmpassword: form.value.confirmpassword
    });

      this.router.navigate(['/users']);
  }

}
