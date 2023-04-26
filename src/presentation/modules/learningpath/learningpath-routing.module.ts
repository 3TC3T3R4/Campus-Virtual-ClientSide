import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "src/presentation/shared/layouts/app-layout/app-layout.component";
import { MainLearningpathsComponent } from "./pages/main-learningpaths/main-learningpaths.component";

const routes: Routes = [
    {
      path: 'learningpaths',
      // canActivate: [allowedRoles([Roles.Admin])],
      // canLoad: [allowedRoles([Roles.Admin])],
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          component: MainLearningpathsComponent,
        },
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LearningPathRoutingModule { }
  