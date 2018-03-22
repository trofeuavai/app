import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router/';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import 'firebase/storage';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { database } from 'firebase/app';

@Injectable()
export class AuthService {

  pass:any;
  failMessage: any;
  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private firebase: FirebaseApp) { 
    this.firebase.database().ref("password/").on('value', data => this.getPassword(data), this.errData);
    this.failMessage = true;
  }

  getPassword(data){
    console.log(data.val());
    this.pass = data.val();
  }

  errData(){

  }

  fazerLogin(usuario: Usuario){
    if(usuario.nome == 'admin' && usuario.senha == this.pass){
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/']);
      console.log('Autenticado com sucesso');
    }else{
      

      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      return false;
    }
  }

  fazerLogout(){
    this.usuarioAutenticado = false;
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']);
    console.log('Usuario deslogado com sucesso');
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
