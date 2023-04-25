
import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { CourseModel } from 'src/domain/models/course/course.model';


export class DeleteCourseProfileUseCase implements UseCase<string, CourseModel> {

    constructor(private courseRepository: CourseRepository) { }

    execute(id : string): Observable<CourseModel> {
        return this.courseRepository.deleteCourseAsync(id);
  }
}
