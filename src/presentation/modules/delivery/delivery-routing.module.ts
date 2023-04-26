import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
import { DeliveryByPathIDComponent } from './pages/delivery-by-path-id/delivery-by-path-id.component';
import { DeliveryByUidUserComponent } from './pages/delivery-by-uid-user/delivery-by-uid-user.component';
import { DeliveryComponent } from './pages/create-delivery/delivery.component';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'create-delivery',
        component: DeliveryComponent,
      },
      {
        path: 'delivery-path-list',
        component: DeliveryByPathIDComponent,
      },
      {
        path: 'delivery-iudUser-list',
        component: DeliveryByUidUserComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
