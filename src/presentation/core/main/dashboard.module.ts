import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    // enrutadores de cada modulo
  ],
})
export class DashboardModule { }
