import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public imgUrl: string = '';
  public name: string = '';
  public email: string = '';

  constructor (
    private readonly authService: AuthService, 
    private readonly router: Router,
  ) {
    // console.log({img: this.authService.loggedUser!.imgUrl});
    this.imgUrl = this.authService.loggedUser!.imgUrl;
    this.name = this.authService.loggedUser!.name;
    this.email = this.authService.loggedUser!.email;
  }

  public logOut() {
    this.authService.removeDataInLocalStorage();
    this.router.navigate(['/auth/sign-in']);
  }
}
