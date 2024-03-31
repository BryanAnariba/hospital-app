import { Component } from '@angular/core';
import { Menu, SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public menuItem: Menu[] = [];

  constructor (private readonly sidebarService: SidebarService) {
    this.menuItem = sidebarService.menu;
  }

}
