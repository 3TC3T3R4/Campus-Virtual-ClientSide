import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetContentByIdUseCase } from 'src/bussiness/useCases/content/queries/getId-content.usecase';
import { CreateDeliveryUseCase } from 'src/bussiness/useCases/delivery/create-delivery.usecase';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.scss']
})
export class DetailContentComponent {

  id : string = '';
  type: number = 0;
  content : ContentModel;
  deliveryForm : FormGroup;

  constructor(private routeActive: ActivatedRoute,
              private getContentById: GetContentByIdUseCase,
              private createDelivery : CreateDeliveryUseCase,
              private router : Router,
              private toastr: ToastrService){

    this.content = {
      contentID : '',
      courseID : '',
      title : '',
      description : '',
      type : 1,
      duration : 0,
      stateContent : 1,
    }
    this.deliveryForm = new FormGroup({
      contentID: new FormControl<string>(''),
      uidUser: new FormControl<string>(''),
      deliveryField: new FormControl<string>('',Validators.required)
    });
  }

  ngOnInit(): void {
    if(this.routeActive.snapshot.params['id']){
      this.type = parseInt(this.routeActive.snapshot.params['type'])
      //this.createMode = false;
      this.id = this.routeActive.snapshot.params['id'];

      this.getContentById.execute(this.id).subscribe({
        next: content => (this.content = content, console.log(content)),
        error:err => console.log(err),
        complete: () => {console.log('Complete');}
      });
    }
  }

  send(){
    this.deliveryForm.get('contentID')?.setValue(this.id);
    this.deliveryForm.get('uidUser')?.setValue(localStorage.getItem('uidUser') as string);
    console.log(this.deliveryForm.value)
    this.createDelivery.execute(this.deliveryForm.value).subscribe({
      next: result =>{
          this.toastr.success('Create delivery successfully.', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
      },
      error:err =>{
        console.log(err),
        this.toastr.warning('Delivery not made.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      complete: () => {
        console.log('Complete');
        this.router.navigate([`/dashboard/content/list/${this.content.courseID}`]);
      }
    });
  }

}
