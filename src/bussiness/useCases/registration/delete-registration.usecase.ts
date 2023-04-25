import { UseCase } from "src/base/utils/IUseCase";
import { RegistrationRepository } from '../../repositories/registration/registration.repository';
import { Observable } from "rxjs";

export class DeleteRegistrationUseCase implements UseCase<number, string>{
  constructor(private registrationRepository: RegistrationRepository) { }

  execute(registrationID: number): Observable<string> {
    return this.registrationRepository.deleteRegistrationAsync(registrationID);
  }
}
