import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/presentation/core/security/pages/login/login.component';

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
      import('../presentation/core/main/dashboard.module').then((module) => module.DashboardModule),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'dashboard/registrations', // localhost:4200/dashboard/projects
    loadChildren: () =>
      import('src/presentation/modules/registration/registration.module').then(
        (module) => module.RegistrationModule
      ),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  // {
  //   path: '**',
  //   component: LoginComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
