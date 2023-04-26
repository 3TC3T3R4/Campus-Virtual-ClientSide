import { UserRepository } from 'src/bussiness/repositories/user/user.repository';
import { GetAllUsersUseCase } from 'src/bussiness/useCases/user/get-all-users.usecase';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/get-user-by-id.usecase';
import { CreateUserUseCase } from '../../../bussiness/useCases/user/create-user.usecase';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserImplementationRepository } from './user-implementation-repository';
import { GetUserByEmailUseCase } from 'src/bussiness/useCases/user/get-user-by-email.usecase';

const CreateUserUseCaseFactory = (userRepo: UserRepository) => new CreateUserUseCase(userRepo);
export const CreateUserUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: CreateUserUseCaseFactory,
  deps: [UserRepository]
};

const GetAllUsersUseCaseFactory = (userRepo: UserRepository) => new GetAllUsersUseCase(userRepo);
export const GetAllUsersUseCaseProvider = {
  provide: GetAllUsersUseCase,
  useFactory: GetAllUsersUseCaseFactory,
  deps: [UserRepository]
};

const GetUserByIdUseCaseFactory = (userRepo: UserRepository) => new GetUserByIdUseCase(userRepo);
export const GetUserByIdUseCaseProvider = {
  provide: GetUserByIdUseCase,
  useFactory: GetUserByIdUseCaseFactory,
  deps: [UserRepository]
};

const GetUserByEmailUseCaseFactory = (userRepo: UserRepository) => new GetUserByEmailUseCase(userRepo);
export const GetUserByEmailUseCaseProvider = {
  provide: GetUserByEmailUseCase,
  useFactory: GetUserByEmailUseCaseFactory,
  deps: [UserRepository]
};

@NgModule({
  providers: [
    CreateUserUseCaseProvider,
    GetAllUsersUseCaseProvider,
    GetUserByIdUseCaseProvider,
    GetUserByEmailUseCaseProvider,
    {
      provide: UserRepository,
      useClass: UserImplementationRepository
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class UserModule { }
