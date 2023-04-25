
import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { UpdateCourseModel } from 'src/domain/commands/course/updateCourse.model';

export class UpdateCourseProfileUseCase implements UseCase<UpdateCourseModel, UpdateCourseModel> {

    constructor(private courseRepository: CourseRepository) { }

    execute(course : UpdateCourseModel): Observable<UpdateCourseModel> {
        return this.courseRepository.updateCourseAsync(course);
  }
}


