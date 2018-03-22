import { Injectable , EventEmitter} from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component'
import { ToolbarComponent } from './toolbar/toolbar.component'


@Injectable()
export class TogglesidebarService {

  static toggleEvent = new EventEmitter<string>();

  constructor() {

  }

  toggleSidebar(toggle: string){
    TogglesidebarService.toggleEvent.emit(toggle);
  }


}
