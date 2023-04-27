
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { CreateCourseProfileUseCase } from 'src/bussiness/useCases/course/createCourse.usecase';
import { UpdateCourseProfileUseCase } from 'src/bussiness/useCases/course/updateCourse.usecase';
import { GetCourseByIdProfileUseCase } from 'src/bussiness/useCases/course/getCourseById.usecase';
import { DeleteCourseProfileUseCase } from 'src/bussiness/useCases/course/deleteCourse.usecase';
import { ConfigurePathCourseProfileUseCase } from 'src/bussiness/useCases/course/configurePath.usecase';
import { GetCourseByPathIdProfileUseCase } from 'src/bussiness/useCases/course/getCoursesByPathId.usecase';
import { UpdateDurationCourseProfileUseCase } from 'src/bussiness/useCases/course/updateDuration.usecase';
import { CourseImplementationRepository } from './course-implementation-repository';

import { NgModule } from '@angular/core';
import { GetCourseActiveUseCase } from 'src/bussiness/useCases/course/getCourseActive.usecase';


const createCourseProfileUseCaseFactory =
(courseRepo: CourseRepository) => new CreateCourseProfileUseCase(courseRepo);
export const createCourseProfileUseCaseProvider = {
    provide: CreateCourseProfileUseCase,
    useFactory: createCourseProfileUseCaseFactory,
    deps: [CourseRepository],
};

const updateCourseAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new UpdateCourseProfileUseCase(courseRepo);
export const updateCourseAsyncUseCaseProvider = {
    provide: UpdateCourseProfileUseCase,
    useFactory: updateCourseAsyncUseCaseFactory,
    deps: [CourseRepository],
};

const getCourseByIdAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new GetCourseByIdProfileUseCase(courseRepo);
export const getCourseByIdAsyncUseCaseProvider = {
    provide: GetCourseByIdProfileUseCase,
    useFactory: getCourseByIdAsyncUseCaseFactory,
    deps: [CourseRepository],
};

const deleteCourseAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new DeleteCourseProfileUseCase(courseRepo);
export const deleteCourseAsyncUseCaseProvider = {
    provide: DeleteCourseProfileUseCase,
    useFactory: deleteCourseAsyncUseCaseFactory,
    deps: [CourseRepository],
};

const configurePathAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new ConfigurePathCourseProfileUseCase(courseRepo);
export const configurePathAsyncUseCaseProvider = {
    provide: ConfigurePathCourseProfileUseCase,
    useFactory: configurePathAsyncUseCaseFactory,
    deps: [CourseRepository],
};

const getCoursesByPathIdAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new GetCourseByPathIdProfileUseCase(courseRepo);
export const getCoursesByPathIdAsyncUseCaseProvider = {
    provide: GetCourseByPathIdProfileUseCase,
    useFactory: getCoursesByPathIdAsyncUseCaseFactory,
    deps: [CourseRepository],
};

const updateDurationAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new UpdateDurationCourseProfileUseCase(courseRepo);
export const updateDurationAsyncUseCaseProvider = {
    provide: UpdateDurationCourseProfileUseCase,
    useFactory: updateDurationAsyncUseCaseFactory,
    deps: [CourseRepository],
};

const getCoursesActiveAsyncUseCaseFactory =
(courseRepo: CourseRepository) => new GetCourseActiveUseCase(courseRepo);
export const getCoursesActiveAsyncUseCaseProvider = {
    provide: GetCourseActiveUseCase,
    useFactory: getCoursesActiveAsyncUseCaseFactory,
    deps: [CourseRepository],
};

@NgModule({
    providers: [
        createCourseProfileUseCaseProvider,
        updateCourseAsyncUseCaseProvider,
        getCourseByIdAsyncUseCaseProvider,
        deleteCourseAsyncUseCaseProvider,
        configurePathAsyncUseCaseProvider,
        getCoursesByPathIdAsyncUseCaseProvider,
        updateDurationAsyncUseCaseProvider,
        getCoursesActiveAsyncUseCaseProvider,

        {provide: CourseRepository, useClass: CourseImplementationRepository },
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class CourseModule {}
