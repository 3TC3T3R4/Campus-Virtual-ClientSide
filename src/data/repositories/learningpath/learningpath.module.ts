import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";
import { CreateLearningPathUseCase } from "src/bussiness/useCases/learningpath/create-learningpath.usecase";
import { DeleteLearnigPathUseCase } from "src/bussiness/useCases/learningpath/delete-learningpath.usecase";
import { GetAllLearnigPathUseCase } from "src/bussiness/useCases/learningpath/get-all-learningpaths.usecase";
import { GetLearningPathByIdUseCase } from "src/bussiness/useCases/learningpath/get-learnigpath-by-id.usecase";
import { GetLearningPathByCoachUseCase } from "src/bussiness/useCases/learningpath/get-learningpath-by-coach.usecase";
import { UpdateLearningPathDurationUseCase } from "src/bussiness/useCases/learningpath/update-learningpath-duration.usecase";
import { LearningPathImplementationRepository } from "./learningpath-implementation-repository";
import { NgModule } from "@angular/core";

const CreateLearningPathUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new CreateLearningPathUseCase(learningRepo);
export const CreateLearningPathUseCaseProvider = {
  provide: CreateLearningPathUseCase,
  useFactory: CreateLearningPathUseCaseFactory,
  deps: [LearningPathRepository]
};

const GetAllLearningPathsUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new GetAllLearnigPathUseCase(learningRepo);
export const GetAllLearningPathUseCaseProvider = {
  provide: GetAllLearnigPathUseCase,
  useFactory: GetAllLearningPathsUseCaseFactory,
  deps: [LearningPathRepository]
};

const GetLearningPathByIdUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new GetLearningPathByIdUseCase(learningRepo);
export const GetLearningPathByIdUseCaseProvider = {
  provide: GetLearningPathByIdUseCase,
  useFactory: GetLearningPathByIdUseCaseFactory,
  deps: [LearningPathRepository]
};

const GetLearningPathByCoachIdUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new GetLearningPathByCoachUseCase(learningRepo);
export const GetLearningPathByCoachCaseProvider = {
  provide: GetLearningPathByCoachUseCase,
  useFactory: GetLearningPathByCoachIdUseCaseFactory,
  deps: [LearningPathRepository]
};

const DeleteLearningPathUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new DeleteLearnigPathUseCase(learningRepo);
export const DeleteRegistrationUseCaseProvider = {
  provide: DeleteLearnigPathUseCase,
  useFactory: DeleteLearningPathUseCaseFactory,
  deps: [LearningPathRepository]
};

const UpdateLearningPathDurationUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new UpdateLearningPathDurationUseCase(learningRepo);
export const UpdateLearningPathDurationUseCaseProvider = {
  provide: UpdateLearningPathDurationUseCase,
  useFactory: UpdateLearningPathDurationUseCaseFactory,
  deps: [LearningPathRepository]
};

const UpdateLearningPathUseCaseFactory = (learningRepo: LearningPathRepository) =>
  new UpdateLearningPathDurationUseCase(learningRepo);
export const UpdateLearningPathByIdUseCaseProvider = {
  provide: UpdateLearningPathDurationUseCase,
  useFactory: UpdateLearningPathUseCaseFactory,
  deps: [LearningPathRepository]
};


@NgModule({
  providers: [
    CreateLearningPathUseCaseProvider,
    GetAllLearningPathUseCaseProvider,
    GetLearningPathByIdUseCaseProvider,
    GetLearningPathByCoachCaseProvider,
    DeleteRegistrationUseCaseProvider,
    UpdateLearningPathByIdUseCaseProvider,
    UpdateLearningPathDurationUseCaseProvider,
    {
      provide: LearningPathRepository,
      useClass: LearningPathImplementationRepository,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class LearningPathModule { }
