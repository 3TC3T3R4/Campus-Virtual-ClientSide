import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateContentUseCase } from 'src/bussiness/useCases/content/commands/create-content.usecase';
import { UpdateContentUseCase } from 'src/bussiness/useCases/content/commands/update-content.usecase';
import { GetContentByIdUseCase } from 'src/bussiness/useCases/content/queries/getId-content.usecase';
import { UpdateContentCommand } from 'src/domain/commands/content/update-content.command';

@Component({
  selector: 'sofka-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() courseId: string;

  contentForm: FormGroup;

  totalDuration : number;

  idContent : string;

  createMode : boolean;

  content : UpdateContentCommand;

  constructor(private contentCreate : CreateContentUseCase,
              private getContentId : GetContentByIdUseCase,
              private updateContent : UpdateContentUseCase,
              private router: Router,
              private routeActive: ActivatedRoute,
              private toastr: ToastrService){
    this.totalDuration = 0;
    this.courseId = '';
    this.idContent = '';
    this.createMode = true;
    this.content = {
      courseID : '',
      title : '',
      description : '',
      type : 1,
      duration : 0,
      stateContent : 1
    }
    this.contentForm = new FormGroup({
      courseId: new FormControl<string>(''),
      title: new FormControl<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      description: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      type: new FormControl<number | null>(null, Validators.required),
      duration: new FormControl<number | null>(null, Validators.required),
    });

  }


  ngOnInit(): void {
    if(this.routeActive.snapshot.params['idContent']){
      this.idContent = this.routeActive.snapshot.params['idContent'];
      this.createMode = false;
      this.getContentId.execute(this.idContent).subscribe({
        next: content =>{
          this.content = content,
          console.log(content)
        },
        error:err => console.log(err),
        complete: () => {
          console.log('Complete');
          this.contentForm.get('title')?.setValue(this.content.title);
          this.contentForm.get('description')?.setValue(this.content.description);
          this.contentForm.get('duration')?.setValue(this.content.duration);
        }
      });
      
    }
    else{
      this.createMode = true;
    }
    
    console.log(this.idContent)
  }




  create(){
    this.contentForm.get('courseId')?.setValue(this.courseId);
    this.contentForm.get('type')?.setValue(JSON.parse(this.contentForm.get('type')?.value));
    console.log(this.contentForm.value)

    this.contentCreate.execute(this.contentForm.value).subscribe({
      next: content =>{
        console.log(content),
        this.toastr.success('Update Course successfully.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error:err => console.log(err),
      complete: () => {
        console.log('Complete');
        this.router.navigate([`/dashboard/content/list/${this.courseId}`]);
      }
    });
  }

  return(){
    this.router.navigate([`/dashboard/content/list/${this.courseId}`]);
  }

  update(){
    this.content.description = this.contentForm.get('description')?.value
    this.content.title = this.contentForm.get('title')?.value
    this.content.type = parseInt(this.contentForm.get('type')?.value);
    this.content.duration = parseInt(this.contentForm.get('duration')?.value);
    
    console.log( this.content)

    this.updateContent.execute({idContent : this.idContent, content : this.content}).subscribe({
      next: content => {
        console.log(content),
        this.toastr.success('Update Content successfully.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      error:err => console.log(err),
      complete: () => {
        console.log('Complete');
        this.router.navigate([`/dashboard/content/list/${this.courseId}`]);
      }
    });

    /* this.contentCreate.execute(this.contentForm.value).subscribe({
      next: content => console.log(content),
      error:err => console.log(err),
      complete: () => {
        console.log('Complete');
        this.router.navigate([`/dashboard/content/list/${this.courseId}`]);
      }
    }); */
  }
}
