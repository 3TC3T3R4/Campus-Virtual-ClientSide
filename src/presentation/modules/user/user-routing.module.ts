import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppLayoutComponent } from "src/presentation/shared/layouts/app-layout/app-layout.component";
import { MainUsersComponent } from "./pages/main-users/main-users.component";
import { Roles } from "src/base/utils/enums";
import { allowedRoles } from "src/presentation/shared/guards/has-role.guard";
import { DashboardComponent } from "src/presentation/core/main/pages/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: 'users',
    canActivate: [allowedRoles([Roles.Admin])],
    canLoad: [allowedRoles([Roles.Admin])],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: MainUsersComponent,
      },
      {
        path: '**',
        component: MainUsersComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
