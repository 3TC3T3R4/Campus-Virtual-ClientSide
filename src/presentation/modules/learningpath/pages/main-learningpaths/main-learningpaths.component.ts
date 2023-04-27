import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLearningPathUseCase } from 'src/bussiness/useCases/learningpath/create-learningpath.usecase';
import { LearningPathModel } from '../../../../../domain/models/learningpath/learningpath';
import { GetAllLearnigPathUseCase } from 'src/bussiness/useCases/learningpath/get-all-learningpaths.usecase';
import { updateLearningPathByIdUseCase } from 'src/bussiness/useCases/learningpath/update-learningpath.usecase';
import { NewLearningPathCommand } from 'src/domain/commands/learningpath/newLearningPathCommands';
import { GetLearningPathByIdUseCase } from 'src/bussiness/useCases/learningpath/get-learnigpath-by-id.usecase';
@Component({
  selector: 'sofka-main-learningpaths',
  templateUrl: './main-learningpaths.component.html',
  styleUrls: ['./main-learningpaths.component.scss']
})
export class MainLearningpathsComponent {
 //routes
 routeDashboard: string[];
 //variables
 render!: boolean;
 frmFormReactive : FormGroup;
 form: FormGroup;
 learningPathContent: LearningPathModel[] | undefined;
 formConten: LearningPathModel | undefined;
 coachIDL: string | undefined;
finalContent: NewLearningPathCommand | undefined;


 constructor(private taskById:GetLearningPathByIdUseCase,private taskUpdate: updateLearningPathByIdUseCase,private taskCreate: CreateLearningPathUseCase,private taskGetAll: GetAllLearnigPathUseCase , private router: Router) {
   this.routeDashboard = ['../'];
   this.render = true;
   this.coachIDL = localStorage.getItem('uidUser') as string;
   this.frmFormReactive = new FormGroup({

    coachID:new FormControl(null),
    title:new FormControl('',  [
      Validators.required,
      Validators.minLength(6)

    ]),

    description:new FormControl('',  [
      Validators.required,
      Validators.min(10)
    ])

  });

  this.form = new FormGroup({

    title:new FormControl('',  [
      Validators.required,
      Validators.minLength(6)

    ]),

    description:new FormControl('',  [
      Validators.required,
      Validators.min(10)
    ]),

  });



 }

 sendData(): void {

  if (this.frmFormReactive.invalid) {

    alert('No puedes crear un articulo vacio, llenar todos los campos');

  }
  
  this.frmFormReactive.get('coachID')?.setValue(this.coachIDL);

  console.log('sendData',this.frmFormReactive);
  this.taskCreate.execute(this.frmFormReactive.getRawValue()).subscribe({
    next: (data) => {
      console.log(data);
      alert('LearningPath created successfully');
      this.router.navigate(['./dashboard']);
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log('complete');
    }

  });



}
ngOnInit(): void {
  this.taskGetAll.execute().subscribe({
    next: (data) => {
      this.learningPathContent = data;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log('complete');
    }
  });
}






sendUpdate(pathId: string):void{

this.taskById.execute(pathId).subscribe({

  next: (data) => {

    // this.form.setValue({

    //   coachID: data.coachID,
    //   title: data.title,
    //   description: data.description


    // });
    
    this.taskUpdate.execute({idContent: pathId, content: this.form.getRawValue()}).subscribe({

      next: (data) => {
        console.log(data);
        alert('LearningPath updated successfully');
        this.router.navigate(['./dashboard']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }

    });

  }


});





}





}
