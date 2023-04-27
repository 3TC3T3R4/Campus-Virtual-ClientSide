import { RegistrationRepository } from '../../repositories/registration/registration.repository';
import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { RegistrationWithPaths } from 'src/domain/DTO/registration/registration-with-learningpaths';
export class GetAllRegistrationsUseCase implements UseCase<void, RegistrationWithPaths[]>{
  constructor(private registrationRepository: RegistrationRepository) { }

  execute(): Observable<RegistrationWithPaths[]> {
    return this.registrationRepository.getAllRegistrationsAsync();
  }
}
