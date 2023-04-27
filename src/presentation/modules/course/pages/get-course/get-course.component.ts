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
  role : number;
  message: string = '';
  id?: string;


  constructor(private getCourse: GetCourseByIdProfileUseCase,
              private getCoursePathIdUseCase: GetCourseByPathIdProfileUseCase,
              private router: Router){
    this.role = 0;
  }


/*   ngOnInit(): void {
    this.role = 1
    if(this.role === 1){
      this.
    }
    this.tareaService.getAll(localStorage.getItem('uid')).subscribe({
      next: tarea => (this.tareas = tarea.sort((a, b) => a.dia - b.dia)),
      error: err => console.log(err),
      complete: () => console.log('Complete')
    });
  } */

}
