import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/presentation/shared/shared.module";
import { RegistrationRoutingModule } from "./registration-routing.module";
import { MainRegistrationsComponent } from './pages/main-registrations/main-registrations.component';

@NgModule({
  declarations: [
    MainRegistrationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class RegistrationModule { }
