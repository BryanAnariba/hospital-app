import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviornments';
import { TokenInfo } from '../auth/services/auth.service';
import { Observable } from 'rxjs';
import { RoleResponse } from '../interfaces';

const baseUrl: string = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  get token(): string {
    const tokenInfo = localStorage.getItem('token')
      ? (JSON.parse(localStorage.getItem('token')!) as TokenInfo)
      : { token: '', email: '' };
    return tokenInfo.token;
  }

  public getRoles(): Observable<RoleResponse> {
    return this.httpClient.get<RoleResponse>(
      `${baseUrl}/roles?limit=10&skip=1`,
      {
        headers: {
          'x-access-token': `Bearer ${this.token}`,
        },
      }
    );
  }
}
