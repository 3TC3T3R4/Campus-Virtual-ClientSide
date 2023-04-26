import { Observable } from 'rxjs';
import { NewRegistrationCommand } from 'src/domain/commands/registration/new-registration-command';
import { RegistrationModel } from '../../../domain/models/registration/registration.model';

export abstract class RegistrationRepository {
  abstract createRegistrationAsync(
    newRegistrationCommand: NewRegistrationCommand
  ): Observable<string>;

  abstract getAllRegistrationsAsync(): Observable<RegistrationModel[]>;

  abstract getRegistrationByIdAsync(
    registrationID: number
  ): Observable<RegistrationModel>;

  abstract deleteRegistrationAsync(registrationID: number): Observable<string>;

  abstract averageFinalRatingAsync(params: {
    uidUser: string;
    pathID: string;
  }): Observable<RegistrationModel>;
}
