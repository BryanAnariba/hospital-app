import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../shared/validators/form.validator';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

  public formValidator: FormValidator = new FormValidator();
  public isSubmitedForm: boolean = false;

  constructor (private formBuilder: FormBuilder, private authService: AuthService) {}

  public signUpForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)], []],
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required, Validators.minLength(6)], []],
      passwordR: ['', [Validators.required, Validators.minLength(6)], []],
      terms: [false, [Validators.requiredTrue], []],
    }, 
    {
      validators: this.matchPasswords('password', 'passwordR')
    }
  );

  public createUser () {
    this.isSubmitedForm = true;
    if (this.signUpForm.invalid) return;
    //console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          //console.error(error.error.error);
          Swal.fire('Error', error.error.error, 'error');
        }
      });
  }

  public isMatchedPassword(): boolean {
    const pwdOne = this.signUpForm.get('password')?.value;
    const pwdTwo = this.signUpForm.get('passwordR')?.value;
    if (pwdOne === pwdTwo) return true;
    return false;
  }

  // ESTO ES PARA QUE NO CREE EL USUARIO, LA VALIDACION DEL METODO isMatchedPassword SOLO LANZA LA ALERTA PERO DEJA PASAR LA INFORMACION
  public matchPasswords(password: string, passwordR: string) {
    return (formGroup: FormGroup) => {
      const pwdOne = formGroup.get(password);
      const pwdTwo = formGroup.get(passwordR);
      if (pwdOne?.value === pwdTwo?.value) {
        pwdTwo?.setErrors(null);
      } else {
        pwdTwo?.setErrors({notEqualPwds: true});
      }
    }
  }
}
