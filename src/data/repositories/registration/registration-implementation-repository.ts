import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationRepository } from 'src/bussiness/repositories/registration/registration.repository';
import { NewRegistrationCommand } from 'src/domain/commands/registration/newRegistrationCommand';
import { RegistrationModel } from 'src/domain/models/registration/registration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationImplementationRepository extends RegistrationRepository {
  constructor(private http: HttpClient) {
    super();
  }

  createRegistrationAsync(
    newRegistrationCommand: NewRegistrationCommand
  ): Observable<string> {
    return this.http.post<string>(
      `${environment.urlApiCampus}Registration`,
      newRegistrationCommand
    );
  }
  getAllRegistrationsAsync(): Observable<RegistrationModel[]> {
    return this.http.get<RegistrationModel[]>(
      `${environment.urlApiCampus}Registration`
    );
  }
  getRegistrationByIdAsync(
    registrationID: number
  ): Observable<RegistrationModel> {
    return this.http.get<RegistrationModel>(
      `${environment.urlApiCampus}Registration/ID?registrationID=${registrationID}`
    );
  }
  deleteRegistrationAsync(registrationID: number): Observable<string> {
    return this.http.delete<string>(
      `${environment.urlApiCampus}Registration/ID?registrationID=${registrationID}`
    );
  }
  averageFinalRatingAsync(params: {
    uidUser: string,
    pathID: string
  }
  ): Observable<RegistrationModel> {
    return this.http.patch<RegistrationModel>(
      `${environment.urlApiCampus}Registration/AverageFinalRating?uidUser=${params.uidUser}&pathID=${params.pathID}`,
      params
    );
  }
}
