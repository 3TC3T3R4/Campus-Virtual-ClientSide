import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";
import { CreateContentUseCase } from "src/bussiness/useCases/content/commands/create-content.usecase";
import { DeleteContentUseCase } from "src/bussiness/useCases/content/commands/delete-content.usecase";
import { UpdateContentUseCase } from "src/bussiness/useCases/content/commands/update-content.usecase";
import { GetAllContentUseCase } from "src/bussiness/useCases/content/queries/getAll-content.usecase";
import { GetContentByCourseUseCase } from "src/bussiness/useCases/content/queries/getCourse-content.usecase";
import { GetContentByIdUseCase } from "src/bussiness/useCases/content/queries/getId-content.usecase";
import { ContentImplementationRepository } from "./content-implementation.repository";

const createContentUseCaseFactory = 
(contentRepo: ContentRepository) => new CreateContentUseCase(contentRepo);
export const createContentUseCaseProvider = {
    provide: CreateContentUseCase,
    useFactory: createContentUseCaseFactory,
    deps: [ContentRepository],
};

const updateContentUseCaseFactory = 
(contentRepo: ContentRepository) => new UpdateContentUseCase(contentRepo);
export const updateContentUseCaseProvider = {
    provide: UpdateContentUseCase,
    useFactory: updateContentUseCaseFactory,
    deps: [ContentRepository],
};

const deleteContentUseCaseFactory = 
(contentRepo: ContentRepository) => new DeleteContentUseCase(contentRepo);
export const deleteContentUseCaseProvider = {
    provide: DeleteContentUseCase,
    useFactory: deleteContentUseCaseFactory,
    deps: [ContentRepository],
};

const getAllContentUseCaseFactory = 
(contentRepo: ContentRepository) => new GetAllContentUseCase(contentRepo);
export const getAllContentUseCaseProvider = {
    provide: GetAllContentUseCase,
    useFactory: getAllContentUseCaseFactory,
    deps: [ContentRepository],
};

const getContentByIdUseCaseFactory = 
(contentRepo: ContentRepository) => new GetContentByIdUseCase(contentRepo);
export const getContentByIdUseCaseProvider = {
    provide: GetContentByIdUseCase,
    useFactory: getContentByIdUseCaseFactory,
    deps: [ContentRepository],
};

const getContentByCourseUseCaseFactory = 
(contentRepo: ContentRepository) => new GetContentByCourseUseCase(contentRepo);
export const getContentByCourseUseCaseProvider = {
    provide: GetContentByCourseUseCase,
    useFactory: getContentByCourseUseCaseFactory,
    deps: [ContentRepository],
};


@NgModule({
    declarations: [],
    providers: [
        createContentUseCaseProvider,
        updateContentUseCaseProvider,
        deleteContentUseCaseProvider,
        getAllContentUseCaseProvider,
        getContentByIdUseCaseProvider,
        getContentByCourseUseCaseProvider,
        { provide: ContentRepository, useClass: ContentImplementationRepository},
],
imports: [
  CommonModule,
  HttpClientModule
]
})
export class ContentModule { }