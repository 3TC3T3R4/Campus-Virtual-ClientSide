import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateContentUseCase } from 'src/bussiness/useCases/content/commands/create-content.usecase';

@Component({
  selector: 'sofka-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() courseId: string = '';
  contentForm: FormGroup;

  constructor(private contentCreate : CreateContentUseCase,
              private router: Router){

    this.contentForm = new FormGroup({
      courseId: new FormControl<string>(''),
      title: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      type: new FormControl<number | null>(null, Validators.required),
      duration: new FormControl<number | null>(null, Validators.required),
    });

  }

  create(){
    this.contentForm.get('courseId')?.setValue(this.courseId);
    this.contentForm.get('type')?.setValue(JSON.parse(this.contentForm.get('type')?.value));
    console.log(this.contentForm.value)

    this.contentCreate.execute(this.contentForm.value).subscribe({
      next: content => console.log(content),
      error:err => console.log(err),
      complete: () => {
        console.log('Complete');
        //this.router.navigate(["/home/activity/transaction/list"]);
      }
    });
  }


}
