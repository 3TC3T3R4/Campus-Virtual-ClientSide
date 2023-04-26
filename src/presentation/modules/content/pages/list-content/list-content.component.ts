import { Component } from '@angular/core';
import { GetAllContentUseCase } from 'src/bussiness/useCases/content/queries/getAll-content.usecase';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss']
})
export class ListContentComponent {

  contents : ContentModel[];

  constructor(private getContent : GetAllContentUseCase){
    this.contents = []
  }

  ngOnInit(): void {
    this.getContent.execute().subscribe({
      next: content => (this.contents = content, console.log(content))
    });
  }

  
}
