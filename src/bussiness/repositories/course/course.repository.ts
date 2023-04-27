import { Observable } from 'rxjs';
import { AssingToPathModel } from 'src/domain/commands/course/assingToPath.model';
import { NewCourseModel } from 'src/domain/commands/course/newCourse.model';
import { UpdateCourseModel } from 'src/domain/commands/course/updateCourse.model';
import { UpdateDurationModel } from 'src/domain/commands/course/updateDuration.model';
import { CourseModel } from 'src/domain/models/course/course.model';

export abstract class CourseRepository {
    abstract createCourseAsync(course: NewCourseModel): Observable<NewCourseModel>;
    abstract updateCourseAsync(course: UpdateCourseModel): Observable<UpdateCourseModel>;
    abstract deleteCourseAsync(id: string): Observable<CourseModel>;
    abstract getCourseByIdAsync(id: string): Observable<CourseModel>;
    abstract getCoursesByPathIdAsync(id: string): Observable<CourseModel[]>;
    abstract getCoursesActiveAsync(): Observable<CourseModel[]>;
    abstract updateDurationAsync(duration: UpdateDurationModel): Observable<CourseModel>;
    abstract configurePathAsync(path: AssingToPathModel): Observable<CourseModel>;
}
