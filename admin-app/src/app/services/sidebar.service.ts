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
      icon: 'fa fa-tachometer',
      subMenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Graphics', url: '/dashboard/graphics' },
        { title: 'Promises', url: '/dashboard/promises'},
        { title: 'RXJS', url: '/dashboard/rxjs' },
      ]
    },
    {
      title: 'Mainteances',
      icon: 'fa fa-folder-open-o',
      subMenu: [
        { title: 'Users', url: 'users' },
        { title: 'Doctors', url: 'doctors' },
        { title: 'Hospitals', url: 'hospitals'},
      ]
    }
  ]

  constructor() { }
}
