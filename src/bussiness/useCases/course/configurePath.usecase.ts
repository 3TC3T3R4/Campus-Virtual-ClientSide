
import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { AssingToPathModel } from 'src/domain/commands/course/assingToPath.model';
import { CourseModel } from 'src/domain/models/course/course.model';

export class ConfigurePathCourseProfileUseCase implements UseCase<AssingToPathModel, CourseModel> {

    constructor(private courseRepository: CourseRepository) { }

    execute(path : AssingToPathModel): Observable<CourseModel> {
        return this.courseRepository.configurePathAsync(path);
    }

}
