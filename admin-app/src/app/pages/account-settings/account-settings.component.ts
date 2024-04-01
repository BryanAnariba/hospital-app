import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {
  public links: NodeListOf<Element> = document.querySelectorAll('.selector');

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  constructor (private readonly settingsService: SettingsService) {}

  public onChangeTheme(theme: string): void {
    this.settingsService.changeTheme(theme);
  }


}
