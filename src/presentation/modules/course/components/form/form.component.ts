import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCourseProfileUseCase } from 'src/bussiness/useCases/course/createCourse.usecase';

@Component({
  selector: 'sofka-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  contentForm: FormGroup;

  totalDuration : number;

  constructor(private courseCreate : CreateCourseProfileUseCase,
              private router: Router){
    this.totalDuration = 0;
    this.contentForm = new FormGroup({
      title: new FormControl<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
    });

  }

  create(){
    console.log(this.contentForm.value)

    this.courseCreate.execute(this.contentForm.value).subscribe({
      next: content => console.log(content),
      error:err => console.log(err),
      complete: () => {
        console.log('Complete');
        this.router.navigate(["/dashboard/courses"]);
      }
    });
  }
}