import { Component } from '@angular/core';

@Component({
  selector: 'sofka-main-registrations',
  templateUrl: './main-registrations.component.html',
  styleUrls: ['./main-registrations.component.scss']
})
export class MainRegistrationsComponent {
  //routes
  routeDashboard: string[];

  //variables
  render!: boolean;

  constructor() {
    this.routeDashboard = ['../'];
    this.render = true;
  }
}
