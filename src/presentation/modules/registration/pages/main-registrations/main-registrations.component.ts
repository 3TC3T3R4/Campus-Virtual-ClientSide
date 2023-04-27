import { Component, OnInit } from '@angular/core';
import { GetAllRegistrationsUseCase } from '../../../../../bussiness/useCases/registration/get-all-registrations.usecase';
import { RegistrationModel } from 'src/domain/models/registration/registration.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetAllUsersUseCase } from '../../../../../bussiness/useCases/user/get-all-users.usecase';
import { GetLearningPathByCoachUseCase } from '../../../../../bussiness/useCases/learningpath/get-learningpath-by-coach.usecase';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/domain/models/user/user.model';
import { LearningPathModel } from 'src/domain/models/learningpath/learningpath';
import { CreateRegistrationUseCase } from 'src/bussiness/useCases/registration/create-registration.usecase';
import { DeleteRegistrationUseCase } from '../../../../../bussiness/useCases/registration/delete-registration.usecase';
import { AverageFinalRatingUseCase } from '../../../../../bussiness/useCases/registration/average-final-rating.usecase';

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
  registrationID!: number;
  uidUser!: string;
  pathID!: string;
  usersList!: UserModel[];
  pathsList!: LearningPathModel[];
  coachID: string;

  //forms
  frmCreateRegistration: FormGroup;

  constructor(
    private getAllRegistrationsUseCase: GetAllRegistrationsUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getLearningPathByCoachUseCase: GetLearningPathByCoachUseCase,
    private createRegistrationUseCase: CreateRegistrationUseCase,
    private deleteRegistrationUseCase: DeleteRegistrationUseCase,
    private averageFinalRatingUseCase: AverageFinalRatingUseCase,
    private toastr: ToastrService
  ) {
    this.coachID = localStorage.getItem('uidUser') as string;
    this.routeDashboard = ['../'];
    this.empty = false;
    this.frmCreateRegistration = new FormGroup({
      uidUser: new FormControl('', [Validators.required]),
      pathID: new FormControl('', [Validators.required]),
    });
    setTimeout(() => {
      this.render = true;
    }, 2000);
  }

  ngOnInit(): void {
    this.getAllRegistrations();
    this.getAllUsers();
    this.getLearningPathByCoach();
  }

  modal(registrationID: number, uidUser?: string, pathID?: string): void {
    this.registrationID = registrationID;
    this.uidUser = uidUser as string;
    this.pathID = pathID as string;
  }

  //#region create registration
  sendData(): void {
    let subCreateRegistration = this.createRegistrationUseCase.execute(this.frmCreateRegistration.value).subscribe({
      next: (data) => {
        this.toastr.success('Registration successfully.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.getAllRegistrations();
      },
      error: (error) => {
        this.toastr.warning('User may already be registered.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      complete: () => {
        subCreateRegistration.unsubscribe();
      }
    });
  }
  //#endregion

  //#region delete registration with modal
  deleteRegistration(registrationID: number): void {
    let subDeleteRegistration = this.deleteRegistrationUseCase.execute(registrationID).subscribe({
      next: (data) => {
        this.toastr.success('Registration successfully deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.getAllRegistrations();
      },
      error: (error) => {
        this.toastr.warning('Registration was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      complete: () => {
        subDeleteRegistration.unsubscribe();
      }
    });
  }
  //#endregion

  //#region average final rating with modal
  averageFinalRating(): void {
    let subAverageFinalRating = this.averageFinalRatingUseCase.execute({ uidUser: this.uidUser, pathID: this.pathID }).subscribe({
      next: (data) => {
        this.toastr.success('Average final rating successfully.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.getAllRegistrations();
      },
      error: (error) => {
        this.toastr.warning('Average final rating was no updated.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      },
      complete: () => {
        subAverageFinalRating.unsubscribe();
      }
    });
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
      error: (error) => { },
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
      error: (error) => { },
      complete: () => {
        subGetLearningPathByCoach.unsubscribe();
      }
    });
  }
  //#endregion
}
