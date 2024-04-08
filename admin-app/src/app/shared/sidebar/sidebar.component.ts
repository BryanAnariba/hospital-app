import { Component } from '@angular/core';
import { Menu, SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public menuItem: Menu[] = [];
  public imgUrl: string ='';
  public name: string = '';

  constructor (private readonly sidebarService: SidebarService, private authService: AuthService) {
    this.menuItem = sidebarService.menu;
    this.imgUrl = this.authService.loggedUser!.imgUrl;
    this.name = this.authService.loggedUser!.name;
  }

}
