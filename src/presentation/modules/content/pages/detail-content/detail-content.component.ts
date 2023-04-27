import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetContentByIdUseCase } from 'src/bussiness/useCases/content/queries/getId-content.usecase';
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
  constructor(private routeActive: ActivatedRoute, private getContentById: GetContentByIdUseCase){
    this.content = {
      contentID : '',
      courseID : '',
      title : '',
      description : '',
      type : 1,
      duration : 0,
      stateContent : 1,
    }
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
    else{
      //this.createMode = true;
    }
    
    console.log(this.id)
  }



}
