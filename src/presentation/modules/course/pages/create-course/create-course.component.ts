import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCourseProfileUseCase } from 'src/bussiness/useCases/course/createCourse.usecase';
import { UpdateCourseProfileUseCase } from 'src/bussiness/useCases/course/updateCourse.usecase';
import { UpdateDurationCourseProfileUseCase } from 'src/bussiness/useCases/course/updateDuration.usecase';
import { NewCourseModel } from 'src/domain/commands/course/newCourse.model';
import { UpdateCourseModel } from 'src/domain/commands/course/updateCourse.model';
import { UpdateDurationModel } from 'src/domain/commands/course/updateDuration.model';

@Component({
  selector: 'sofka-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})

export class CreateCourseComponent {

  courseToCreate: NewCourseModel[];
  courseToUpdate?: UpdateCourseModel;
  duration?: UpdateDurationModel;

  frmFormulario : FormGroup;
  showMessage: boolean = false;
  message: string = '';

  constructor(private createCourseUseCase: CreateCourseProfileUseCase,
    private updateCourseUseCase: UpdateCourseProfileUseCase,
    private updateDurationCourseUseCase: UpdateDurationCourseProfileUseCase,
    private router: Router)
   {
    this.courseToCreate = [];
    this.frmFormulario = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseID : new FormControl('', [Validators.required]),
      stateCourse : new FormControl('', [Validators.required]),
      duration : new FormControl('', [Validators.required]),
    });
   }

   createCourse() {
    console.log(this.frmFormulario.getRawValue())
    this.createCourseUseCase.execute(this.frmFormulario.getRawValue()).subscribe({
      next:(Item) =>{
        console.log(Item);
        this.message = 'Course created successfully';
        this.showMessage = true;
        this.frmFormulario.reset();
        setTimeout(() => {
          this.message = '';
          this.showMessage = false;
        }, 3000);
      },
    });
  }

  updateCourse() {
    console.log(this.frmFormulario.getRawValue())
    this.updateCourseUseCase.execute(this.frmFormulario.getRawValue()).subscribe({
      next:(Item) =>{
        console.log(Item);
        this.message = 'Course updated successfully';
        this.showMessage = true;
        this.frmFormulario.reset();
        setTimeout(() => {
          this.message = '';
          this.showMessage = false;
        }, 3000);
      }
    });
  }

  updateDuration(){
    this.duration = {
      courseID: this.frmFormulario.get('courseID')?.value,
      duration: this.frmFormulario.get('duration')?.value};
    this.updateDurationCourseUseCase.execute(this.duration).subscribe({
      next:(Item) =>{
        console.log(Item);
        this.message = 'Duration updated successfully';
        this.showMessage = true;
        this.frmFormulario.reset();
        setTimeout(() => {
          this.message = '';
          this.showMessage = false;
        }, 3000);
      }
    });
  }
}





