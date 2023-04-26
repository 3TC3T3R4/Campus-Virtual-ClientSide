import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCourseComponent } from './pages/main-course/main-course.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { GetCourseComponent } from './pages/get-course/get-course.component';


const routes: Routes = [
  {
    path : '',
    component : MainCourseComponent,
    children: [
      {
        path: 'course',
        component: CreateCourseComponent
      },

      {
        path: 'get',
        component: GetCourseComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
