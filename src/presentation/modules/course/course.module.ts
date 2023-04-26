import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseRoutingModule } from './course-routing.module';
import { MainCourseComponent } from './pages/main-course/main-course.component';
import { GetCourseComponent } from './pages/get-course/get-course.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { RouteCourseComponent } from './pages/route-course/route-course.component';
import { AssingPathComponent } from './assing-path/assing-path.component';



@NgModule({
  declarations: [
    CreateCourseComponent,
    MainCourseComponent,
    GetCourseComponent,
    RouteCourseComponent,
    AssingPathComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CourseRoutingModule,
  ]
})
export class CourseModule { }
