import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviornments';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces';

const baseUrl: string = environment.base_url;
export enum typeOfImg {
  HOSPITALS = 'hospitals',
  USERS = 'users',
  DOCTORS = 'doctors',
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  public updatePhoto(
    file: File,
    type: typeOfImg,
    id: string
  ): Observable<User> {
    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient.post<User>(
      `${baseUrl}/uploads/${type}/${id}`,
      formData,
      this.authService.headers
    );
  }
}
