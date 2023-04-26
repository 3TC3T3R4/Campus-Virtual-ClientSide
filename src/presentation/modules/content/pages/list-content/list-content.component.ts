import { Component } from '@angular/core';
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

  constructor(private getContent : GetAllContentUseCase,
              private getContentByCourse : GetContentByCourseUseCase){
    this.contents = []
  }

  ngOnInit(): void {
    this.getContentByCourse.execute('3f5ac9aa-1b09-4c39-9584-5aead893d301').subscribe({
      next: content => (this.contents = content, console.log(content))
    });
  }

  
}
