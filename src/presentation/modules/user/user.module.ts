import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/presentation/shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";
import { MainUsersComponent } from "./pages/main-users/main-users.component";

@NgModule({
  declarations: [
    MainUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class UserModule { }
