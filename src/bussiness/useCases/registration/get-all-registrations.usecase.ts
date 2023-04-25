import { RegistrationModel } from 'src/domain/models/registration/registration.model';
import { RegistrationRepository } from '../../repositories/registration/registration.repository';
import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
export class GetAllRegistrationsUseCase implements UseCase<void, RegistrationModel[]>{
  constructor(private registrationRepository: RegistrationRepository) { }

  execute(): Observable<RegistrationModel[]> {
    return this.registrationRepository.getAllRegistrationsAsync();
  }
}
