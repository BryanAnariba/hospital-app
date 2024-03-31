import { Injectable } from '@angular/core';

export interface Menu {
  title: string;
  icon: string;
  subMenu: SubMenu[];
}

export interface SubMenu {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Graphics', url: '/dashboard/graphics' },
        { title: 'Promises', url: '/dashboard/promises'},
        { title: 'RXJS', url: '/dashboard/rxjs' },
      ]
    }
  ]

  constructor() { }
}
