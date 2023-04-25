
import { Observable } from 'rxjs';
import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { UpdateDurationModel } from 'src/domain/commands/course/updateDuration.model';
import { CourseModule } from 'src/data/repositories/course/course.module';
import { UseCase } from 'src/base/utils/IUseCase';

export class UpdateDurationCourseProfileUseCase implements UseCase<UpdateDurationModel, CourseModule> {

    constructor(private courseRepository: CourseRepository) { }

    execute(duration : UpdateDurationModel): Observable<CourseModule> {
        return this.courseRepository.updateDurationAsync(duration);
  }

}
