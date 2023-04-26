import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegistrationModule } from 'src/data/repositories/registration/registration.module';
import { UserModule } from 'src/data/repositories/user/user.module';
import { DeliveryModule } from 'src/data/repositories/delivery/delivery.module';
import { ContentModule } from 'src/data/repositories/content/content.module';
import { environment } from 'src/environments/environment';
import { LoginComponent } from 'src/presentation/core/security/pages/login/login.component';
import { LearningPathModule } from 'src/data/repositories/learningpath/learningpath.module';
import { CourseModule } from 'src/presentation/modules/course/course.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    UserModule,
    CourseModule,
    DeliveryModule,
    ContentModule,
    LearningPathModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
