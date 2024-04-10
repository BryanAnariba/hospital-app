import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public user!: User;

  constructor (
    private readonly authService: AuthService, 
    private readonly router: Router,
  ) {
    this.user = this.authService.loggedUser;
  }

  public logOut() {
    this.authService.removeDataInLocalStorage();
    this.router.navigate(['/auth/sign-in']);
  }
}
