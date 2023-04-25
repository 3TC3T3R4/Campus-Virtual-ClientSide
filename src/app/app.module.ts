import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegistrationModule } from 'src/data/repositories/registration/registration.module';
import { DeliveryModule } from 'src/data/repositories/delivery/delivery.module';

@NgModule({
  declarations: [
    AppComponent,
    //login component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RegistrationModule,
    DeliveryModule,
    ToastrModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
