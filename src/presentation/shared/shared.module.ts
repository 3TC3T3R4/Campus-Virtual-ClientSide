import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { EnumsNumberToStringPipe } from './pipes/enums-number.pipe/enums-number-to-string.pipe';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';
import { DateToRelativeTimePipe } from './pipes/date-to-relative-time.pipe/date-to-relative-time.pipe';
import { InputSearchComponent } from './components/input-search/input-search.component';

@NgModule({
  declarations: [
    EnumsNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
    AppLayoutComponent,
    ShowForRolesDirective,
    DateToRelativeTimePipe,
    InputSearchComponent,
  ],
  exports: [
    EnumsNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
    AppLayoutComponent,
    ShowForRolesDirective,
    DateToRelativeTimePipe,
    InputSearchComponent
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule { }
