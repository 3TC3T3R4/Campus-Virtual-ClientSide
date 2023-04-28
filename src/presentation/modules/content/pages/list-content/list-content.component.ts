import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetContentByCourseUseCase } from 'src/bussiness/useCases/content/queries/getCourse-content.usecase';
import { ContentModel } from 'src/domain/models/content/content.model';
import { GetCourseByIdProfileUseCase } from '../../../../../bussiness/useCases/course/getCourseById.usecase';

@Component({
  selector: 'sofka-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss'],
})
export class ListContentComponent {
  contents: ContentModel[];
  courseID: string;
  //routes
  routeDashboard!: string[];

  //variables
  render!: boolean;

  constructor(
    private getContentByCourse: GetContentByCourseUseCase,
    private getCourseByIdProfileUseCase: GetCourseByIdProfileUseCase,
    private routeActive: ActivatedRoute,
    private router: Router
  ) {
    this.contents = [];
    this.courseID = '';
    setTimeout(() => {
      this.render = true;
    }, 800);
  }

  ngOnInit(): void {
    if (this.routeActive.snapshot.params['id']) {
      this.courseID = this.routeActive.snapshot.params['id'];
      let subContents = this.getContentByCourse
        .execute(this.courseID)
        .subscribe({
          next: (contents) => (this.contents = contents),
          error: (err) => console.log(err),
          complete: () => {
            subContents.unsubscribe();
          },
        });
    }
    let subGetCourse = this.getCourseByIdProfileUseCase
      .execute(this.courseID)
      .subscribe({
        next: (course) => {
          this.routeDashboard = [`/dashboard/courses/list/${course.pathID}`];
        },
        error: (err) => console.log(err),
        complete: () => {
          subGetCourse.unsubscribe();
        },
      });
  }

  create() {
    this.router.navigate([`/dashboard/content/create/${this.courseID}`]);
  }
}
