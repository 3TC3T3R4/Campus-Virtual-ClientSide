import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLearningpathsComponent } from './pages/main-learningpaths/main-learningpaths.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        MainLearningpathsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class LearningpathModule { }
