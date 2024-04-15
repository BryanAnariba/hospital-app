import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviornments';
import { AuthService } from '../auth/services/auth.service';
import { Observable, delay, map } from 'rxjs';
import { UserPaginationResponse } from '../interfaces';
import { User} from '../models';
import { UserResponse } from '../auth/interfaces';
import { User as IUser } from '../interfaces/user.interface';


const baseUrl: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private httpClient: HttpClient, private authService: AuthService) {}

  public updateUserProfile(data: {email: string, name: string}) {
    return this.httpClient.put(`${baseUrl}/users/${this.authService.userId}`, data, this.authService.headers);
  }

  public getUsers (limit: number, skip: number): Observable<UserPaginationResponse> {
    return this.httpClient.get<UserPaginationResponse>(`${baseUrl}/users?limit=${limit}&skip=${skip}`, this.authService.headers)
    .pipe(
      // delay(
      //   1000,
      // ),
      map(data => {
        const users = data.users.map(user => new User(user.name, user.email, user.img, user.role, user.google, user.isActive, user.createdAt, user.updatedAt, user._id))
        return {
          ...data,
          users: users,
        };
      }),
    );
  }

  public deleteUser(id: string): Observable<UserResponse> {
    return this.httpClient.delete<UserResponse>(`${baseUrl}/users/${id}`, this.authService.headers);
  }

  public updateUserRole(user: User, newRole: string) {
    return this.httpClient.put(`${baseUrl}/users/${user._id}`, {
      _id: user._id,
      name: user.name,
      email: user.email,
      img: user.img,
      role: newRole,
      google: user.google,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }, this.authService.headers);
  }
}