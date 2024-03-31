import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  constructor (private readonly router: Router) {}

  public onSignIn() {
    this.router.navigate(['/dashboard']);
  }
}
