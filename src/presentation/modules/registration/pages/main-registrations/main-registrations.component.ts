import { Component, OnInit } from '@angular/core';
import { GetAllRegistrationsUseCase } from '../../../../../bussiness/useCases/registration/get-all-registrations.usecase';
import { RegistrationModel } from 'src/domain/models/registration/registration.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetAllUsersUseCase } from '../../../../../bussiness/useCases/user/get-all-users.usecase';
import { GetLearningPathByCoachUseCase } from '../../../../../bussiness/useCases/learningpath/get-learningpath-by-coach.usecase';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/domain/models/user/user.model';
import { LearningPathModel } from 'src/domain/models/learningpath/learningpath';

@Component({
  selector: 'sofka-main-registrations',
  templateUrl: './main-registrations.component.html',
  styleUrls: ['./main-registrations.component.scss']
})
export class MainRegistrationsComponent implements OnInit {
  //routes
  routeDashboard: string[];

  //variables
  render!: boolean;
  empty: boolean;
  registrationsList!: RegistrationModel[];
  usersList!: UserModel[];
  pathsList!: LearningPathModel[];
  coachID: string;

  //forms
  frmCreateRegistration: FormGroup;

  constructor(
    private getAllRegistrationsUseCase: GetAllRegistrationsUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getLearningPathByCoachUseCase: GetLearningPathByCoachUseCase,
    private toastr: ToastrService
  ) {
    this.coachID = localStorage.getItem('uidUser') as string;
    this.routeDashboard = ['../'];
    this.empty = false;
    this.frmCreateRegistration = new FormGroup({
      uidUser: new FormControl('', [Validators.required]),
      pathID: new FormControl('', [Validators.required]),
    });
    this.getAllRegistrations();
    this.getAllUsers();
    this.getLearningPathByCoach();
    setTimeout(() => {
      this.render = true;
    }, 1500);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //#region create registration
  sendData(): void {

  }
  //#endregion

  //#region consults
  getAllRegistrations(): void {
    let subGetAllRegistrations = this.getAllRegistrationsUseCase.execute().subscribe({
      next: (data) => {
        this.registrationsList = data;
        this.empty = false;
      },
      error: (error) => {
        console.log(error);
        this.empty = true;
      },
      complete: () => {
        subGetAllRegistrations.unsubscribe();
      }
    });
  }

  getAllUsers(): void {
    let subGetAllUsers = this.getAllUsersUseCase.execute().subscribe({
      next: (data) => {
        this.usersList = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        subGetAllUsers.unsubscribe();
      }
    });
  }

  getLearningPathByCoach(): void {
    let subGetLearningPathByCoach = this.getLearningPathByCoachUseCase.execute(this.coachID).subscribe({
      next: (data) => {
        this.pathsList = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        subGetLearningPathByCoach.unsubscribe();
      }
    });
  }
  //#endregion
}
