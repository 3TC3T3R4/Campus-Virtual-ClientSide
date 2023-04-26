import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppLayoutComponent } from "src/presentation/shared/layouts/app-layout/app-layout.component";
import { MainRegistrationsComponent } from "./pages/main-registrations/main-registrations.component";

const routes: Routes = [
  {
    path: 'registrations',
    // canActivate: [allowedRoles([Roles.Admin])],
    // canLoad: [allowedRoles([Roles.Admin])],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: MainRegistrationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule { }
