import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteCourseProfileUseCase } from 'src/bussiness/useCases/course/deleteCourse.usecase';
import { CourseModel } from 'src/domain/models/course/course.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  @Input() courses: CourseModel[];


   //pagination
   contentsPerPageTable: number = 6;
   page: number = 1;
   pages: number[] = [];
   totalPages: number = 0;


  constructor(private router: Router,
              private deleteCourse: DeleteCourseProfileUseCase,
              private toastr: ToastrService){
    this.courses = [];
  }

  content(idCourse : string){
    this.router.navigate([`/dashboard/content/list/${idCourse}`]);
  }

  detail(idCourse : string, type : number){
    //this.router.navigate([`/dashboard/content/detail/${idCourse}/${type}`]);
  }

  update(idCourse : string){
    this.router.navigate([`/dashboard/courses/update/${idCourse}`]);
  }

  delete(idCourse : string, index : number){
    console.log(idCourse)
    this.deleteCourse.execute(idCourse).subscribe({
      next: result =>{
        console.log(result),
        this.toastr.success('Course successfully deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error: err =>{
        console.log(err);
        this.toastr.warning('Course was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      complete: () => {console.log('Complete'), this.courses.splice(index, 1);}
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
