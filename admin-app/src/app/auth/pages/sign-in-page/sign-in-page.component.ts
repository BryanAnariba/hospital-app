import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormValidator } from '../../../shared/validators/form.validator';
import Swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formValidator: FormValidator = new FormValidator();
  public isSubmitedForm: boolean = false;

  constructor (
    private readonly router: Router,
    private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    this.googleSignIn();
  }

  public signInForm: FormGroup = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email], []],
    password: ['', [Validators.required], []],
    remenber: [false, [Validators.required], []],
  });
 
  public signIn () {
    this.isSubmitedForm = true;
    if (this.signInForm.invalid) return;
    this.authService.signIn(this.signInForm.value)
      .subscribe({
        next: (data) => {
          if (this.signInForm.get('remenber')?.value) localStorage.setItem('email', data.user.email);
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          Swal.fire('Error', error.error.error, 'error');
        }
      });
  }

  private handleCredentialResponse (response: any) {
    this.authService.googleSignIn(response.credential)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          })
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  public googleSignIn () {
    google.accounts.id.initialize({
      client_id: '343059810791-nkue7tbe6doh257b5qh5a6utefpua3iu.apps.googleusercontent.com', // proccess.env.GOOGLE_ID
      callback: (response: any) => this.handleCredentialResponse(response), // peculiar!!! como se llama pero asi hacemos referencia a la funcion
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large", shape: "circle", type: "icon" }
    );
  }

}
