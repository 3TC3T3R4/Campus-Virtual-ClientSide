import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './pages/delivery.component';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from 'src/presentation/shared/layouts/app-layout/app-layout.component';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'delivery',
        component: DeliveryComponent,
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
