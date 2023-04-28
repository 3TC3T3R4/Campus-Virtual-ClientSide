import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/presentation/core/security/pages/login/login.component';
import * as tslib from 'tslib';
// import {
//   AngularFireAuthGuard,
//   redirectLoggedInTo,
//   redirectUnauthorizedTo,
// } from '@angular/fire/compat/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
// const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'log-in',
    component: LoginComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectLoggedInToDashboard },
  },

  {
    path: 'dashboard', // localhost:4200/dashboard
    loadChildren: () =>
      import('../presentation/core/main/dashboard.module').then(
        (module) => module.DashboardModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'dashboard/users',
    loadChildren: () =>
      import('src/presentation/modules/user/user.module').then(
        (module) => module.UserModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'dashboard/registrations',
    loadChildren: () =>
      import('src/presentation/modules/registration/registration.module').then(
        (module) => module.RegistrationModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'dashboard/learningpaths',
    loadChildren: () =>
      import('src/presentation/modules/learningpath/learningpath.module').then(
        (module) => module.LearningpathModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'dashboard/courses', // localhost:4200/course
    loadChildren: () =>
      import('../presentation/modules/course/course.module').then(
        (module) => module.CourseModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'dashboard/content',
    loadChildren: () =>
      import('../presentation/modules/content/content.module').then(
        (module) => module.ContentModule
      ) /*
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }, */,
  },

  {
    path: 'dashboard/create-delivery',
    loadChildren: () =>
      import('../presentation/modules/delivery/delivery.module').then(
        (module) => module.DeliveryModule
      ),
  },

  {
    path: 'dashboard/delivery-path-list/:pathID',
    loadChildren: () =>
      import('../presentation/modules/delivery/delivery.module').then(
        (module) => module.DeliveryModule
      ),
  },

  {
    path: 'dashboard/delivery-iudUser-list/:uidUser',
    loadChildren: () =>
      import('../presentation/modules/delivery/delivery.module').then(
        (module) => module.DeliveryModule
      ),
  },

  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
