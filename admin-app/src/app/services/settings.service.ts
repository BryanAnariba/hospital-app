import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  public url: string = '';

  constructor() {
    this.url = localStorage.getItem('theme')
      ? localStorage.getItem('theme')!!
      : './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', this.url);
  }

  public changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    links.forEach((link: Element) => {
      // Borramos la clase
      link.classList.remove('working');
      // Si ha coincidencia agregamoes la clase
      const btnTheme = link.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        link.classList.add('working');
      }
    });
  }
}
