import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCourseComponent } from './pages/main-course/main-course.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { GetCourseComponent } from './pages/get-course/get-course.component';
import { AssingPathComponent } from './pages/assing-path/assing-path.component';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';


const routes: Routes = [
  {
    path: 'courses',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: GetCourseComponent
      },
      {
        path: 'create',
        component: CreateCourseComponent
      },
      {
        path: 'list/:id',
        component: GetCourseComponent
      },/* 
      {
        path: 'list',
        component: GetCourseComponent
      }, */
      {
        path: 'path',
        component: AssingPathComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule { }
