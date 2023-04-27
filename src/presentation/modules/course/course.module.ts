import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseRoutingModule } from './course-routing.module';
import { MainCourseComponent } from './pages/main-course/main-course.component';
import { GetCourseComponent } from './pages/get-course/get-course.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { RouteCourseComponent } from './pages/route-course/route-course.component';
import { AssingPathComponent } from './pages/assing-path/assing-path.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    CreateCourseComponent,
    MainCourseComponent,
    GetCourseComponent,
    RouteCourseComponent,
    AssingPathComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CourseRoutingModule,
    HttpClientModule,
  ]
})
export class CourseModule { }
