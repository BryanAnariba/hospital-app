import { Component } from '@angular/core';
import { Menu, SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public menuItem: Menu[] = [];
  public user: User;

  constructor (private readonly sidebarService: SidebarService, private authService: AuthService) {
    this.menuItem = sidebarService.menu;
    this.user = this.authService.loggedUser;
  }

}
