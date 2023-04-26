import { Component, Input } from '@angular/core';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() contents: ContentModel[];

  constructor(){
    this.contents = [];
  }
}
