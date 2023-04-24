import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sofka-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //variables
  render!: boolean;

  constructor(
    private toastr: ToastrService
  ) {
    // setTimeout(() => {
    //   this.render = true;
    // }, 400);
  }

  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
