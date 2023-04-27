import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseRoutingModule } from 'src/presentation/modules/course/course-routing.module';
import { DeliveryRoutingModule } from 'src/presentation/modules/delivery/delivery-routing.module';
import { LearningPathRoutingModule } from 'src/presentation/modules/learningpath/learningpath-routing.module';
import { RegistrationRoutingModule } from 'src/presentation/modules/registration/registration-routing.module';
import { UserRoutingModule } from 'src/presentation/modules/user/user-routing.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    UserRoutingModule,
    RegistrationRoutingModule,
    DeliveryRoutingModule,
    LearningPathRoutingModule,
    CourseRoutingModule
  ],
})
export class DashboardModule { }
