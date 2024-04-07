import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn, SignInResponse, SignUp, SignUpResponse, User } from '../interfaces';
import { environment } from '../../../environments/enviornments';
import { Observable, catchError, map, of, tap } from 'rxjs';

declare const google: any;
declare const gapi: any;

const baseUrl: string = environment.base_url;

export interface TokenInfo {
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public signUp (formData: SignUp): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${baseUrl}/auth/sign-up`, formData)
      .pipe(
        tap(data => {
          this.saveInLocalStorage({token: data.token, email: data.user.email});
        })
      );
  }

  public signIn(formData: SignIn): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${baseUrl}/auth/sign-in`, formData)
      .pipe(
        tap(data => {
          this.saveInLocalStorage({token: data.token, email: data.user.email});
        })
      );
  }
  
  public googleSignIn (token: string): Observable<SignInResponse> {
    //console.log({token})
    return this.http.post<SignInResponse>(`${baseUrl}/auth/google-sign-in`, {token})
      .pipe(
        tap(res => this.saveInLocalStorage({token: res.token, email: res.user.email}))
      );
  }

  public saveInLocalStorage(tokenInfo: TokenInfo) {
    localStorage.setItem('token', JSON.stringify(tokenInfo));
  }

  public removeDataInLocalStorage () {
    const tokenInfo: TokenInfo = (localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')!) : {};
    //console.log({tokenInfo})
    if (tokenInfo) {
      google.accounts.id.revoke(tokenInfo.email, () => {});
    }
    localStorage.removeItem('token');
  }
  
  //  Si el token encontrado coincide y es valido lo renovamos, esto actua como un refresh token
  public verifyAndRefreshToken (): Observable<boolean> {
    const tokenInfo = (localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')!) : {} as TokenInfo;
    return this.http.get<SignInResponse>(`${baseUrl}/auth/verify-refresh-token`, {
      headers: {
        'x-access-token': `Bearer ${tokenInfo.token}`,
      },
    })
      .pipe(
        tap(data => { // renovamos token si llegamos aqui
          this.saveInLocalStorage({token: data.token, email: data.user.email});
        }),
        map( data => true ),
        catchError( error => of(false)  ),
      );
  }

}
