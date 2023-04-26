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
  routeMainLearningPaths: string[];

  // routeListInscriptions: string[];
  // routeListTasks: string[];
  // state: boolean;
  userName!: string | null;

  constructor(
    private readonly auth$: AuthService,
    private router: Router // private readonly state$: StateService
  ) {

    this.routeMainRegistrations = ['registrations'];
    this.routeMainLearningPaths = ['learningpaths'];

    // this.routeListInscriptions = ['inscriptions/list'];
    // this.routeListTasks = ['tasks/list'];
    // this.state = this.state$.State;
  }

  // changeState(): void {
  //   this.state$.State = true;
  //   this.state = this.state$.State;
  // }

  ngOnInit(): void {
    if (localStorage.getItem('userName') !== null) {
      // this.changeState();
      this.userName = localStorage.getItem('userName');
    }
  }

  logout(): void {
    this.auth$.SignOut();
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
