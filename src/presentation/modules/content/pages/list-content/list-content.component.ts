import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAllContentUseCase } from 'src/bussiness/useCases/content/queries/getAll-content.usecase';
import { GetContentByCourseUseCase } from 'src/bussiness/useCases/content/queries/getCourse-content.usecase';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss']
})
export class ListContentComponent {

  contents : ContentModel[];
  courseID : string;

  constructor(private getContent : GetAllContentUseCase,
              private getContentByCourse : GetContentByCourseUseCase,
              private routeActive: ActivatedRoute){
    this.contents = [];
    this.courseID = '';
  }

  ngOnInit(): void {
    if(this.routeActive.snapshot.params['id']){
      this.courseID = this.routeActive.snapshot.params['id'];
      this.getContentByCourse.execute(this.courseID).subscribe({
        next: contents => (this.contents = contents),
        error: err => console.log(err),
        complete: () => console.log('Complete')
      });
    }
    /* this.getContentByCourse.execute('3f5ac9aa-1b09-4c39-9584-5aead893d301').subscribe({
      next: content => (this.contents = content, console.log(content))
    }); */
  }

  
}
