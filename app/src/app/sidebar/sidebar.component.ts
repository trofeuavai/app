import { Component, OnInit } from '@angular/core';
import { TogglesidebarService } from '../togglesidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  toggle = '';
  
  constructor(private toogleService:TogglesidebarService) {
  }

  ngOnInit() {
    TogglesidebarService.toggleEvent.subscribe(
      toggle => (this.toggle=='toggled') ? this.toggle ='' : this.toggle = toggle
    );
  }

  toggleSidebar(){
    if(this.toggle=='toggled'){
      this.toggle = '';
    }else{
      this.toggle = 'toggled';
    }
  }


}
