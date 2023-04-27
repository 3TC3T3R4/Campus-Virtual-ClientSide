import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCourseActiveUseCase } from 'src/bussiness/useCases/course/getCourseActive.usecase';
import { GetCourseByPathIdProfileUseCase } from 'src/bussiness/useCases/course/getCoursesByPathId.usecase';
import { CourseModel } from 'src/domain/models/course/course.model';

@Component({
  selector: 'sofka-get-course',
  templateUrl: './get-course.component.html',
  styleUrls: ['./get-course.component.scss']
})
export class GetCourseComponent implements OnInit {

  role : number | null;
  courses : CourseModel[];
  pathId : string;
   //routes
 routeDashboard: string[];



  constructor(private getCourses: GetCourseActiveUseCase,
              private getCoursePathIdUseCase: GetCourseByPathIdProfileUseCase,
              private router: Router,
              private routeActive: ActivatedRoute){
    this.courses = [];
    this.role = 0;
    this.pathId = '';
    this.routeDashboard = ['../'];
  }


  ngOnInit(): void {
    //this.role = localStorage.getItem('role');
    this.role = 1;
    if(this.routeActive.snapshot.params['id']){
      this.pathId = this.routeActive.snapshot.params['id'];
      this.getCoursePathIdUseCase.execute(this.pathId).subscribe({
        next: course => (this.courses = course),
        error: err => console.log(err),
        complete: () => console.log('Complete')
      });
    }
    if(this.role == 1){
      this.getCourses.execute().subscribe({
        next: course => (this.courses = course),
        error: err => console.log(err),
        complete: () => console.log('Complete')
      });
    }
  }


  create(){
    this.router.navigate(["/dashboard/courses/create"]);
  }

}
