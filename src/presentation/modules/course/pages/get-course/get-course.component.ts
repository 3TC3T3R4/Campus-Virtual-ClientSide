import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteCourseProfileUseCase } from 'src/bussiness/useCases/course/deleteCourse.usecase';
import { GetCourseByIdProfileUseCase } from 'src/bussiness/useCases/course/getCourseById.usecase';
import { GetCourseByPathIdProfileUseCase } from 'src/bussiness/useCases/course/getCoursesByPathId.usecase';

@Component({
  selector: 'sofka-get-course',
  templateUrl: './get-course.component.html',
  styleUrls: ['./get-course.component.scss']
})
export class GetCourseComponent {
  frmFormulario : FormGroup;
  showMessage: boolean = false;
  message: string = '';
  id?: string;


  constructor(private getCourseByIdUseCase: GetCourseByIdProfileUseCase,
    private getCoursePathIdUseCase: GetCourseByPathIdProfileUseCase,
    private deleteCourseUseCase: DeleteCourseProfileUseCase,
    private router: Router){
    this.frmFormulario = new FormGroup({
      courseID : new FormControl('', [Validators.required]),
      pathID : new FormControl('', [Validators.required]),
    });
  }

  getCourseById() {
    console.log(this.frmFormulario.get('courseID')?.value())
    this.getCourseByIdUseCase.execute(this.frmFormulario.get('courseID')?.value).subscribe({
      next:(Item) =>{
        console.log(Item);
        this.message = 'Course found successfully';
        this.showMessage = true;
        this.frmFormulario.reset();
        setTimeout(() => {
          this.message = '';
          this.showMessage = false;
        }, 3000);
      },
    });
  }

  getCourseByPathId() {
    console.log(this.frmFormulario.get('pathID')?.value())
    this.getCoursePathIdUseCase.execute(this.frmFormulario.get('pathID')?.value).subscribe({
      next:(Item) =>{
        console.log(Item);
        this.message = 'Path found successfully';
        this.showMessage = true;
        this.frmFormulario.reset();
        setTimeout(() => {
          this.message = '';
          this.showMessage = false;
        }, 3000);
      },
    });
  }

  deleteCourse() {
    console.log(this.frmFormulario.get('courseID')?.value())
    this.deleteCourseUseCase.execute(this.frmFormulario.get('courseID')?.value).subscribe({
      next:(Item) =>{
        console.log(Item);
        this.message = 'Course deleted successfully';
        this.showMessage = true;
        this.frmFormulario.reset();
        setTimeout(() => {
          this.message = '';
          this.showMessage = false;
        }, 3000);
      },
    });
  }


}
