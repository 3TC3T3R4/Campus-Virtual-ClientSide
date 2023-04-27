import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeliveryByPathIDComponent } from './pages/delivery-by-path-id/delivery-by-path-id.component';
import { DeliveryByUidUserComponent } from './pages/delivery-by-uid-user/delivery-by-uid-user.component';
import { DeliveryComponent } from './pages/create-delivery/delivery.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DeliveryComponent,
    DeliveryByPathIDComponent,
    DeliveryByUidUserComponent,
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class DeliveryModule {}
