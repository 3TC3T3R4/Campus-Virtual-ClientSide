import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateContentComponent } from "./pages/create-content/create-content.component";
import { DetailContentComponent } from "./pages/detail-content/detail-content.component";
import { ListContentComponent } from "./pages/list-content/list-content.component";
import { MainContentComponent } from "./pages/main-content/main-content.component";
import { AppLayoutComponent } from "src/presentation/shared/layouts/app-layout/app-layout.component";

const routes: Routes = [
  
    {
      path: '',
      // canActivate: [allowedRoles([Roles.Admin])],
      // canLoad: [allowedRoles([Roles.Admin])],
      component: AppLayoutComponent,
      children: [
        {
          path: '',
          component: MainContentComponent,
        },
        {
          path: 'list',
          component: ListContentComponent
        },
        {
          path: 'create',
          component: CreateContentComponent
        },
        {
          path: 'detail/:id/:type',
          component: DetailContentComponent
        },
        {
          path: '**',
          redirectTo: 'list'
        }
      ],
    },
  ];
  
  
/*     {
    path : '',
    component : MainContentComponent,
    },
      {
        path: 'list',
        component: ListContentComponent
      },
      {
        path: 'create',
        component: CreateContentComponent
      },
      {
        path: 'detail/:id/:type',
        component: DetailContentComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      } */
  


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContentRoutingModule { }