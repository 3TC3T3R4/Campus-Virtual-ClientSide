import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListContentComponent } from './pages/list-content/list-content.component';
import { DetailContentComponent } from './pages/detail-content/detail-content.component';
import { MainContentComponent } from './pages/main-content/main-content.component';
import { CreateContentComponent } from './pages/create-content/create-content.component';
import { ContentRoutingModule } from './content-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from "../../shared/shared.module";
import { FormComponent } from './components/form/form.component';



@NgModule({
    declarations: [
        ListContentComponent,
        DetailContentComponent,
        MainContentComponent,
        CreateContentComponent,
        ListComponent,
        FormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContentRoutingModule,
        SharedModule
    ]
})
export class ContentModule { }
