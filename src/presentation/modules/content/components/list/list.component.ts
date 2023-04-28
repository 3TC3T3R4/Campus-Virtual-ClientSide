import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteContentUseCase } from 'src/bussiness/useCases/content/commands/delete-content.usecase';
import { GetContentByCourseUseCase } from 'src/bussiness/useCases/content/queries/getCourse-content.usecase';
import { UpdateDurationCourseProfileUseCase } from 'src/bussiness/useCases/course/updateDuration.usecase';
import { UpdateDurationModel } from 'src/domain/commands/course/updateDuration.model';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() contents: ContentModel[];

  durationUpdate : UpdateDurationModel;


   //pagination
   registrationsPerPageTable: number = 6;
   page: number = 1;
   pages: number[] = [];
   totalPages: number = 0;


  constructor(private router: Router,
              private deleteContent: DeleteContentUseCase,
              private updateDuration : UpdateDurationCourseProfileUseCase,
              private getContentByCourse : GetContentByCourseUseCase,
              private toastr: ToastrService){
    this.contents = [];
    this.durationUpdate = {
      courseID: '',
      duration: 0
    }
  }

  detail(idCourse : string, type : number){
    this.router.navigate([`/dashboard/content/detail/${idCourse}/${type}`]);
  }

  update(idCourse : string){
    this.router.navigate([`/dashboard/content/update/${idCourse}`]);
  }

  delete(idCourse : string, index : number){
    console.log(idCourse)
    this.deleteContent.execute(idCourse).subscribe({
      next: result =>{
        console.log(result),
        this.toastr.success('Content successfully deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error: err =>{
        console.log(err);
        this.toastr.warning('Content was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      complete: () => {console.log('Complete'), this.contents.splice(index, 1), this.updateDurationCourse();}
    });
  }


  //#region util methods
  calculatePages(): void {
    this.totalPages = Math.ceil(
      this.contents.length / this.registrationsPerPageTable
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

  /* getContentsCourse(){
    this.getContentByCourse.execute(this.courseId).subscribe({
      next: content =>{this.contents = content ,console.log(content)},
      error:err => console.log(err),
      complete: () => {
        this.updateDurationCourse();
      }
    });
  } */


  updateDurationCourse(){
    this.durationUpdate.courseID = this.contents[0].courseID
    this.contents.forEach(content => {
      this.durationUpdate.duration += content.duration;
    });
    console.log(this.durationUpdate);
    this.updateDuration.execute(this.durationUpdate).subscribe({
      next: result =>{console.log(result)},
      error:err => console.log(err)
    });
  }

}
