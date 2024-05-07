import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable, map, tap } from 'rxjs';
import { HospitalResponse, HospitalsResponse } from '../interfaces';
import { environment } from '../../environments/enviornments';
import { Hospital } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  public getHospitals(
    limit: number,
    skip: number
  ): Observable<{
    totalHospitals: number;
    limit: number;
    skip: number;
    hospitals: Hospital[];
  }> {
    return this.httpClient
      .get<HospitalsResponse>(
        `${environment.base_url}/hospitals?limit=${limit}&skip=${skip}`,
        this.authService.headers
      )
      .pipe(
        map((data) => {
          return {
            totalHospitals: data.totalHospitals,
            skip: data.skip,
            limit: data.limit,
            hospitals: data.hospitals.map(
              (h) =>
                new Hospital(h._id, h.name, h.email, h.isActive, h.user, h.img)
            ),
          };
        })
      );
  }

  public createNewHospital(
    name: string,
    email: string,
    user: string,
  ): Observable<HospitalResponse> {
    return this.httpClient.post<HospitalResponse>(
      `${environment.base_url}/hospitals`,
      { name: name, email: email, user: user },
      this.authService.headers
    );
  }

  public updateHospital(
    _id: string,
    name: string,
    email: string,
    user: string,
  ): Observable<HospitalResponse> {
    return this.httpClient.put<HospitalResponse>(
      `${environment.base_url}/hospitals/${_id}`,
      { name: name, email: email, user: user },
      this.authService.headers
    );
  }

  public deleteHospital(_id: string): Observable<HospitalResponse> {
    return this.httpClient.delete<HospitalResponse>(
      `${environment.base_url}/hospitals/${_id}`,
      this.authService.headers
    );
  }
}
