import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { DeliveryRoutingModule } from 'src/presentation/modules/delivery/delivery-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from 'src/presentation/modules/registration/registration-routing.module';
import { LearningpathModule } from 'src/presentation/modules/learningpath/learningpath.module';
import { LearningPathRoutingModule } from 'src/presentation/modules/learningpath/learningpath-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DeliveryRoutingModule,
    RegistrationRoutingModule,
    LearningPathRoutingModule,
    // enrutadores de cada modulo
  ],
})
export class DashboardModule {}
