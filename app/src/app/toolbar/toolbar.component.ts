import { Component, OnInit } from '@angular/core';
import { TogglesidebarService } from '../togglesidebar.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {

  title = '';

  constructor(
    private service: TogglesidebarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = 'Troféu Avai';
  }

  toggleMenu() {
    this.service.toggleSidebar('toggled');
  }

  fazerLogout(){
    this.authService.fazerLogout();
  }

  trocarSenha(){
    this.router.navigate(['/password']);
  }

}
