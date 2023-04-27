import { Component } from '@angular/core';

@Component({
  selector: 'sofka-main-course',
  templateUrl: './main-course.component.html',
  styleUrls: ['./main-course.component.scss']
})
export class MainCourseComponent {
  //routes
  routeDashboard: string[];

  //variables
  render!: boolean;

  constructor() {
    this.routeDashboard = ['../'];
    this.render = true;
  }
}
