import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteCourseProfileUseCase } from 'src/bussiness/useCases/course/deleteCourse.usecase';
import { CourseModel } from 'src/domain/models/course/course.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() courses: CourseModel[];

  //variables
  courseID!: string;
  index!: any;

  //pagination
  contentsPerPageTable: number = 6;
  page: number = 1;
  pages: number[] = [];
  totalPages: number = 0;

  constructor(
    private router: Router,
    private deleteCourse: DeleteCourseProfileUseCase,
    private toastr: ToastrService
  ) {
    this.courses = [];
  }
  ngOnInit(): void {}

  modal(courseID: string, i: any): void {
    this.courseID = courseID;
    this.index = i;
  }

  content(idCourse: string) {
    this.router.navigate([`/dashboard/content/list/${idCourse}`]);
  }

  update(idCourse: string) {
    this.router.navigate([`/dashboard/courses/update/${idCourse}`]);
  }

  delete(idCourse: string, index: number) {
    let subDelete = this.deleteCourse.execute(idCourse).subscribe({
      next: (result) => {
        this.toastr.success('Course successfully deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.router.navigate([`/dashboard/courses`]);
      },
      error: (err) => {
        this.toastr.warning('Course was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      complete: () => {
        subDelete.unsubscribe();
        this.courses.splice(index, 1);
      },
    });
  }

  //#region util methods
  calculatePages(): void {
    this.totalPages = Math.ceil(
      this.courses.length / this.contentsPerPageTable
    );
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  /* searchByType(term: string): void {
    this.searching = true;
    this.filteredRegistrations = this.registrationsList.filter(
      (registrer) =>
        registrer.description.toLowerCase().includes(term.toLowerCase())
      // registrer.title.toLowerCase().includes(term.toLowerCase())
    );
  } */
  //#endregion
}
