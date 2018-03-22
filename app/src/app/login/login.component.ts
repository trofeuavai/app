import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario;
  failMessage: any;

  constructor(private authService: AuthService) { 
    this.failMessage = false;
  }

  ngOnInit() {
  }

  fazerLogin(){
    this.authService.fazerLogin(this.usuario);
    if(!this.authService.fazerLogin(this.usuario)){
      this.failMessage = true;
    }
  }

}
