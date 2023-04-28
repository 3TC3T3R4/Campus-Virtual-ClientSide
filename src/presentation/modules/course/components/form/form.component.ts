import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCourseProfileUseCase } from 'src/bussiness/useCases/course/createCourse.usecase';
import { GetCourseByIdProfileUseCase } from 'src/bussiness/useCases/course/getCourseById.usecase';
import { UpdateCourseProfileUseCase } from 'src/bussiness/useCases/course/updateCourse.usecase';
import { CourseModel } from 'src/domain/models/course/course.model';

@Component({
  selector: 'sofka-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  contentForm: FormGroup;

  totalDuration : number;

  idCourse : string;

  createMode : boolean;

  course : CourseModel;

  constructor(private courseCreate : CreateCourseProfileUseCase,
              private getCourseById : GetCourseByIdProfileUseCase,
              private updateCourse : UpdateCourseProfileUseCase,
              private router: Router,
              private routeActive: ActivatedRoute){
    this.totalDuration = 0;
    this.idCourse = '';
    this.createMode = true;
    this.course = {
      courseID: '',
      pathID: '',
      title: '',
      description: '',
      duration: 0,
      stateCourse: 0,
    }
    this.contentForm = new FormGroup({
      title: new FormControl<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
    });

  }


  ngOnInit(): void {
    if(this.routeActive.snapshot.params['id']){
      this.idCourse = this.routeActive.snapshot.params['id'];
      this.createMode = false;
      this.getCourseById.execute(this.idCourse).subscribe({
        next: course =>{
          this.course = course,
          console.log(course)
        },
        error:err => console.log(err),
        complete: () => {
          console.log('Complete');
        }
      });
    }
    else{
      this.createMode = true;
    }
    
    console.log(this.idCourse)
  }



  create(){
    //console.log(this.contentForm.value)

    this.courseCreate.execute(this.contentForm.value).subscribe({
      next: course => console.log(course),
      error:err => console.log(err),
      complete: () => {
        console.log('Complete');
        this.router.navigate(["/dashboard/courses"]);
      }
    });
  }

  update(){
    this.course.description = this.contentForm.get('description')?.value
    this.course.title = this.contentForm.get('title')?.value
    console.log(this.course)
  }
}
