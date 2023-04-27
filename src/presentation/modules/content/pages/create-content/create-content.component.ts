import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sofka-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent {

  courseId: string;
  role : number;
  routeDashboard: string[];

  constructor(private routeActive: ActivatedRoute, private router: Router){
    this.role = 0;
    this.courseId = '';
    this.routeDashboard = ['../'];
  }


  ngOnInit(): void {
    if(this.routeActive.snapshot.params['id']){
      this.courseId = this.routeActive.snapshot.params['id'];
    }
  }
}
