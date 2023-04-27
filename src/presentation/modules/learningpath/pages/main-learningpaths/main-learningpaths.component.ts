import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLearningPathUseCase } from 'src/bussiness/useCases/learningpath/create-learningpath.usecase';

@Component({
  selector: 'sofka-main-learningpaths',
  templateUrl: './main-learningpaths.component.html',
  styleUrls: ['./main-learningpaths.component.scss'],
})
export class MainLearningpathsComponent {
  //routes
  routeDashboard: string[];
  //variables
  render!: boolean;
  frmFormReactive: FormGroup;

  constructor(
    private taskCreate: CreateLearningPathUseCase,
    private router: Router
  ) {
    this.routeDashboard = ['../'];
    this.render = true;
    this.frmFormReactive = new FormGroup({
      coachID: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  sendData(): void {
    if (this.frmFormReactive.invalid) {
      alert('No puedes crear un articulo vacio, llenar todos los campos');
    }

    console.log('sendData', this.frmFormReactive);

    this.taskCreate.execute(this.frmFormReactive.getRawValue()).subscribe({});
  }
}
