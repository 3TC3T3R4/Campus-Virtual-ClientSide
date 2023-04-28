import {
  Component,
  OnInit,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
// import { AuthService } from '../../../core/security/services/userAuth/auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/presentation/core/security/services/userAuth/auth.service';
// import { StateService } from '../../../../shared/services/state.service';

@Component({
  selector: 'sofka-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routeMainRegistrations: string[];
  routeMainUsers: string[];
  routeMainLearningPaths: string[];
  routeMainCourses: string[];
  routeTraineeDeliveries: string[];
  email!: string | null;
  traineeID!: string;

  constructor(
    private readonly auth$: AuthService,
    private router: Router
  ) {
    this.traineeID = localStorage.getItem('uidUser') as string;
    this.routeMainRegistrations = ['registrations'];
    this.routeMainUsers = ['users'];
    this.routeMainLearningPaths = ['learningpaths'];
    this.routeMainCourses = ['courses'];
    this.routeTraineeDeliveries = [`delivery-iudUser-list/${this.traineeID}`];
  }
  ngOnInit(): void {
    if (localStorage.getItem('email') !== null) {
      this.email = localStorage.getItem('email');
    }
  }

  logout(): void {
    this.auth$.SignOut();
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
