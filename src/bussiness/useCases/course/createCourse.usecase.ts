
import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { NewCourseModel } from 'src/domain/commands/course/newCourse.model';

export class CreateCourseProfileUseCase implements UseCase<NewCourseModel, NewCourseModel> {

    constructor(private courseRepository: CourseRepository) { }

    execute(course : NewCourseModel): Observable<NewCourseModel> {
        return this.courseRepository.createCourseAsync(course);
  }

}
