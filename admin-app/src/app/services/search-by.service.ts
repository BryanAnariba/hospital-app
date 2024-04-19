import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { environment } from '../../environments/enviornments';
import { searchByType } from '../enums/search.enums';
import { map } from 'rxjs';
import { User } from '../models';

const baseUrl: string = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchByService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private getDataToUsers(data: any, type: searchByType): User[] {
    switch (type) {
      case searchByType.USERS:
        return data.map(
          (user: any) =>
            new User(
              user.name,
              user.email,
              user.img,
              user.role,
              user.google,
              user.isActive,
              user.createdAt,
              user.updatedAt,
              user._id
            )
        );
      case searchByType.DOCTORS:
        throw new Error('Method not implemented yet!');
      case searchByType.HOSPITALS:
        throw new Error('Method not implemented yet!');
      default:
        return [];
      //throw new Error('Method not implemented yet!');
    }
  }

  public searchBy(type: searchByType, term: string) {
    const url: string = `${baseUrl}/search/collection/${type}/by/${term}`;
    return this.httpClient
      .get(url, this.authService.headers)
      .pipe(map((data: any) => this.getDataToUsers(data, searchByType.USERS)));
  }
}
