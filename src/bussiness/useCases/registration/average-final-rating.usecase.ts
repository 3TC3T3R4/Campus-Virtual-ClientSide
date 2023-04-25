import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { RegistrationRepository } from "src/bussiness/repositories/registration/registration.repository";
import { RegistrationModel } from "src/domain/models/registration/registration.model";

export class AverageFinalRatingUseCase implements UseCase<{ uidUser: string, pathID: string }, RegistrationModel>{
  constructor(private registrationRepository: RegistrationRepository) { }

  execute(params: { uidUser: string, pathID: string }): Observable<RegistrationModel> {
    return this.registrationRepository.averageFinalRatingAsync(params);
  }
}
