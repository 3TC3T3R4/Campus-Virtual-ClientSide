import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import {
//   AngularFireAuthGuard,
//   redirectLoggedInTo,
//   redirectUnauthorizedTo,
// } from '@angular/fire/compat/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
// const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);


const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'log-in',
  //   component: LoginComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectLoggedInToDashboard },
  // },

  {
    path: '', // localhost:4200/dashboard
    loadChildren: () =>
      import('../presentation/core/main/dashboard.module').then((module) => module.DashboardModule),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  // {
  //   path: 'dashboard/projects', // localhost:4200/dashboard/projects
  //   loadChildren: () =>
  //     import('../../../../modules/project/project.module').then(
  //       (module) => module.ProjectModule
  //     ),
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin },
  // },

  // {
  //   path: '**',
  //   component: LoginComponent,
  // }

  {
    path: 'dashboard/course', // localhost:4200/course
    loadChildren: () =>
      import('../presentation/modules/course/course.module').then((module) => module.CourseModule),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
