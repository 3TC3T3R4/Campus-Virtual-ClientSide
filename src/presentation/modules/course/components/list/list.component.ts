import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseModel } from 'src/domain/models/course/course.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  @Input() courses: CourseModel[];

  constructor(private router: Router){
    this.courses = [];
  }

  content(idCourse : string){
    this.router.navigate([`/dashboard/content/list/${idCourse}`]);
  }

  detail(idCourse : string, type : number){
    //this.router.navigate([`/dashboard/content/detail/${idCourse}/${type}`]);
  }

  update(idCourse : string){
    console.log(idCourse)
  }

  delete(idCourse : string){
    console.log(idCourse)
  }
}
