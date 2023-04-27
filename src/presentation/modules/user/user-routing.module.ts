import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppLayoutComponent } from "src/presentation/shared/layouts/app-layout/app-layout.component";
import { MainUsersComponent } from "./pages/main-users/main-users.component";

const routes: Routes = [
  {
    path: 'users',
    // canActivate: [allowedRoles([Roles.Admin])],
    // canLoad: [allowedRoles([Roles.Admin])],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: MainUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
