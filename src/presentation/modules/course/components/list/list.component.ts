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

  detail(idCourse : string, type : number){
    //this.router.navigate([`/dashboard/content/detail/${idCourse}/${type}`]);
  }
}
