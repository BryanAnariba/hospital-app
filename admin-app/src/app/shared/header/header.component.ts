import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor (
    private readonly authService: AuthService, 
    private readonly router: Router,
  ) {}

  public logOut() {
    this.authService.removeDataInLocalStorage();
    this.router.navigate(['/auth/sign-in']);
  }
}
