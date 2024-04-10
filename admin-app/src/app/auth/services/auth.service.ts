import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviornments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { SignIn, SignInResponse, SignUp, SignUpResponse } from '../interfaces';
import { User } from '../../models';

declare const google: any;

const baseUrl: string = environment.base_url;

export interface TokenInfo {
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser!: User;

  constructor(private http: HttpClient) {}

  get userId (): string {
    return `${this.loggedUser?._id}`;
  }

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
    console.log('Refreshing token!');
    const tokenInfo = (localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')!) : {} as TokenInfo;
    return this.http.get<SignInResponse>(`${baseUrl}/auth/verify-refresh-token`, {
      headers: {
        'x-access-token': `Bearer ${tokenInfo.token}`,
      },
    })
      .pipe(
        map( data => {
          this.saveInLocalStorage({token: data.token, email: data.user.email});
          const {name, email, img = '', role, google, isActive, createdAt, updatedAt,_id} = data.user;
          this.loggedUser = new User(name, email, img, role, google, isActive, createdAt, updatedAt, _id);
          // console.log(this.loggedUser.printData());
          return true ;
        }),
        catchError( error => of(false)  ),
      );
  }

  get token(): string {
    const tokenInfo = (localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')!) as TokenInfo : {token: '', email: ''} ;
    return tokenInfo.token;
  }

}
