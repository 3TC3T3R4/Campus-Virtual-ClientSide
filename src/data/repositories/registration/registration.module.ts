import { RegistrationRepository } from 'src/bussiness/repositories/registration/registration.repository';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RegistrationImplementationRepository } from './registration-implementation-repository';
import { AverageFinalRatingUseCase } from 'src/bussiness/useCases/registration/average-final-rating.usecase';
import { CreateRegistrationUseCase } from 'src/bussiness/useCases/registration/create-registration.usecase';
import { DeleteRegistrationUseCase } from 'src/bussiness/useCases/registration/delete-registration.usecase';
import { GetAllRegistrationsUseCase } from 'src/bussiness/useCases/registration/get-all-registrations.usecase';
import { GetRegistrationByIdUseCase } from 'src/bussiness/useCases/registration/get-registration-by-id.usecase';

const CreateRegistrationUseCaseFactory = (registrationRepo: RegistrationRepository) =>
  new CreateRegistrationUseCase(registrationRepo);
export const CreateRegistrationUseCaseProvider = {
  provide: CreateRegistrationUseCase,
  useFactory: CreateRegistrationUseCaseFactory,
  deps: [RegistrationRepository]
};

const GetAllRegistrationsUseCaseFactory = (registrationRepo: RegistrationRepository) =>
  new GetAllRegistrationsUseCase(registrationRepo);
export const GetAllRegistrationsUseCaseProvider = {
  provide: GetAllRegistrationsUseCase,
  useFactory: GetAllRegistrationsUseCaseFactory,
  deps: [RegistrationRepository]
};

const GetRegistrationByIdUseCaseFactory = (registrationRepo: RegistrationRepository) =>
  new GetRegistrationByIdUseCase(registrationRepo);
export const GetRegistrationByIdUseCaseProvider = {
  provide: GetRegistrationByIdUseCase,
  useFactory: GetRegistrationByIdUseCaseFactory,
  deps: [RegistrationRepository]
};

const DeleteRegistrationUseCaseFactory = (registrationRepo: RegistrationRepository) =>
  new DeleteRegistrationUseCase(registrationRepo);
export const DeleteRegistrationUseCaseProvider = {
  provide: DeleteRegistrationUseCase,
  useFactory: DeleteRegistrationUseCaseFactory,
  deps: [RegistrationRepository]
};

const AverageFinalRatingUseCaseFactory = (registrationRepo: RegistrationRepository) =>
  new AverageFinalRatingUseCase(registrationRepo);
export const AverageFinalRatingUseCaseProvider = {
  provide: AverageFinalRatingUseCase,
  useFactory: AverageFinalRatingUseCaseFactory,
  deps: [RegistrationRepository]
};

@NgModule({
  providers: [
    CreateRegistrationUseCaseProvider,
    GetAllRegistrationsUseCaseProvider,
    GetRegistrationByIdUseCaseProvider,
    DeleteRegistrationUseCaseProvider,
    AverageFinalRatingUseCaseProvider,
    {
      provide: RegistrationRepository,
      useClass: RegistrationImplementationRepository,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class RegistrationModule { }
