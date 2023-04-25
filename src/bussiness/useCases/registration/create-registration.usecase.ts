import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { RegistrationRepository } from "src/bussiness/repositories/registration/registration.repository";
import { NewRegistrationCommand } from "src/domain/commands/registration/newRegistrationCommand";

export class CreateRegistrationUseCase implements UseCase<NewRegistrationCommand, string>{
  constructor(private registrationRepository: RegistrationRepository) { }

  execute(command: NewRegistrationCommand): Observable<string> {
    return this.registrationRepository.createRegistrationAsync(command);
  }
}
