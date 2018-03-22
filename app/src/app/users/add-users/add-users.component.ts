import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {


  constructor(private angularFire: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    // this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    // .map(res => res)
    // .subscribe(dados => console.log);

    
    this.angularFire.list("users").push(
      {
        name: form.value.name,
        login: form.value.login,
        password: form.value.password,
        confirmpassword: form.value.confirmpassword
      }
    ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);

      this.router.navigate(['/users']);
  }


}
