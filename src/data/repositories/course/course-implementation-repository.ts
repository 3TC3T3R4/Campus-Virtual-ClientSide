import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { CourseRepository } from 'src/bussiness/repositories/course/course.repository';
import { NewCourseModel } from 'src/domain/commands/course/newCourse.model';
import { UpdateCourseModel } from 'src/domain/commands/course/updateCourse.model';
import { CourseModel } from 'src/domain/models/course/course.model';

import { AssingToPathModel } from 'src/domain/commands/course/assingToPath.model';
import { UpdateDurationModel } from 'src/domain/commands/course/updateDuration.model';


@Injectable({
    providedIn: 'root'
  })
  export class CourseImplementationRepository extends CourseRepository {

    constructor(private readonly httpClient: HttpClient,private router: Router) {
        super();
    }

    createCourseAsync(course: NewCourseModel): Observable<NewCourseModel> {
        return this.httpClient.post<NewCourseModel>(environment.urlApiCampus, course);
    }

    updateCourseAsync(course: UpdateCourseModel): Observable<UpdateCourseModel> {
        return this.httpClient.put<UpdateCourseModel>(environment.urlApiCampus, course);
    }

    getCourseByIdAsync(id: string): Observable<CourseModel> {
        return this.httpClient.get<CourseModel>(`${environment.urlApiCampus+ "/GetCourseById?id=", id}`);
    }

    deleteCourseAsync(id : string): Observable<CourseModel> {
        return this.httpClient.delete<CourseModel>(`${environment.urlApiCampus + "/DeleteCourse?id=", id}`);
    }

    configurePathAsync(path: AssingToPathModel): Observable<CourseModel> {
        return this.httpClient.patch<CourseModel>(`${environment.urlApiCampus + "/ConfigurePath/"}`, path);
    }

    getCoursesByPathIdAsync(id: string): Observable<CourseModel[]> {
        return this.httpClient.get<CourseModel[]>(`${environment.urlApiCampus + "/GetCourseByPathId?pathId=", id}`);
    }

    updateDurationAsync(duration: UpdateDurationModel): Observable<CourseModel> {
        return this.httpClient.put<CourseModel>(`${environment.urlApiCampus + "/UpdateDuration/"}`, duration);
    }
  }












