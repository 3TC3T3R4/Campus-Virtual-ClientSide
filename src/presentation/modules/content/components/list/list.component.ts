import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContentModel } from 'src/domain/models/content/content.model';

@Component({
  selector: 'sofka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() contents: ContentModel[];

  constructor(private router: Router){
    this.contents = [];
  }

  detail(idCourse : string, type : number){
    this.router.navigate([`/dashboard/content/detail/${idCourse}/${type}`]);
  }

  update(idCourse : string){
    console.log(idCourse)
  }

  delete(idCourse : string){
    console.log(idCourse)
  }
}
