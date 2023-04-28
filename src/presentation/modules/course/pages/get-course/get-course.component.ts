import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCourseActiveUseCase } from 'src/bussiness/useCases/course/getCourseActive.usecase';
import { GetCourseByPathIdProfileUseCase } from 'src/bussiness/useCases/course/getCoursesByPathId.usecase';
import { CourseModel } from 'src/domain/models/course/course.model';

@Component({
  selector: 'sofka-get-course',
  templateUrl: './get-course.component.html',
  styleUrls: ['./get-course.component.scss'],
})
export class GetCourseComponent implements OnInit {
  render!: boolean;
  role: number | null;
  courses: CourseModel[];
  coursesFiltered!: CourseModel[];
  pathId: string;
  //routes
  routeDashboardTrainee: string[];
  routeDashboardAdmin: string[];

  constructor(
    private getCourses: GetCourseActiveUseCase,
    private getCoursePathIdUseCase: GetCourseByPathIdProfileUseCase,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {
    this.courses = [];
    this.role = 0;
    this.pathId = '';
    this.routeDashboardTrainee = ['/dashboard/learningpaths'];
    this.routeDashboardAdmin = ['/dashboard'];
    setTimeout(() => {
      this.render = true;
    }, 1000);
  }

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') as string);
    // this.role = 1;
    if (this.routeActive.snapshot.params['id']) {
      this.pathId = this.routeActive.snapshot.params['id'];
      this.getCoursePathIdUseCase.execute(this.pathId).subscribe({
        next: (course) => {
          this.coursesFiltered = course;
        },
        error: (err) => console.log(err),
      });
    }
    if (this.role == 1) {
      this.getCourses.execute().subscribe({
        next: (course) => {
          this.courses = course;
          this.coursesFiltered = this.courses.filter(
            (course) => course.stateCourse !== 3
          );
        },
        error: (err) => console.log(err),
      });
    }
  }

  create() {
    this.router.navigate(['/dashboard/courses/create']);
  }
}
