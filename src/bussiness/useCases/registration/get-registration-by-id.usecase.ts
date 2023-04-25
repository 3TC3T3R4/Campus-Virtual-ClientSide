import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { RegistrationRepository } from "src/bussiness/repositories/registration/registration.repository";
import { RegistrationModel } from "src/domain/models/registration/registration.model";

export class GetRegistrationByIdUseCase implements UseCase<number, RegistrationModel>{
  constructor(private registrationRepository: RegistrationRepository) { }

  execute(registrationID: number): Observable<RegistrationModel> {
    return this.registrationRepository.getRegistrationByIdAsync(registrationID);
  }
}
