import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../interfaces';
import { environment } from '../../../environments/enviornments';


const baseUrl: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signUp (formData: SignUp) {
    return this.http.post(`${baseUrl}/auth/sign-up`, formData);
  }
}
