import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviornments';
import { AuthService } from '../auth/services/auth.service';

const baseUrl: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private httpClient: HttpClient, private authService: AuthService) {}

  public updateUserProfile(data: {email: string, name: string}) {
    return this.httpClient.put(`${baseUrl}/users/${this.authService.userId}`, data, {
      headers: {
        'x-access-token': `Bearer ${this.authService.token}`
      }
    });
  }
}