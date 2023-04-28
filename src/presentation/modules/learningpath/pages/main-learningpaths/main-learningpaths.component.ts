import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLearningPathUseCase } from 'src/bussiness/useCases/learningpath/create-learningpath.usecase';
import { LearningPathModel } from '../../../../../domain/models/learningpath/learningpath';
import { GetAllLearnigPathUseCase } from 'src/bussiness/useCases/learningpath/get-all-learningpaths.usecase';
import { updateLearningPathByIdUseCase } from 'src/bussiness/useCases/learningpath/update-learningpath.usecase';
import { NewLearningPathCommand } from 'src/domain/commands/learningpath/newLearningPathCommands';
import { GetLearningPathByIdUseCase } from 'src/bussiness/useCases/learningpath/get-learnigpath-by-id.usecase';
import { DeleteLearnigPathUseCase } from 'src/bussiness/useCases/learningpath/delete-learningpath.usecase';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'sofka-main-learningpaths',
  templateUrl: './main-learningpaths.component.html',
  styleUrls: ['./main-learningpaths.component.scss'],
})
export class MainLearningpathsComponent {
  //routes
  routeDashboard: string[];

  //variables
  render!: boolean;
  empty!: boolean;
  frmFormReactive: FormGroup;
  form: FormGroup;
  formD: FormGroup;
  learningPathContent!: LearningPathModel[];
  pathID!: string;
  titleToUpdate: string = '';
  descriptionToUpdate: string = '';
  role!: string;
  formConten: LearningPathModel | undefined;
  coachIDL: string | undefined;
  finalContent: NewLearningPathCommand | undefined;

  //search
  searching = false;
  filteredPaths!: LearningPathModel[];

  //pagination
  pathsPerPageTable: number = 6;
  page: number = 1;
  pages: number[] = [];
  totalPages: number = 0;

  constructor(
    private taskDelete: DeleteLearnigPathUseCase,
    private taskById: GetLearningPathByIdUseCase,
    private taskUpdate: updateLearningPathByIdUseCase,
    private taskCreate: CreateLearningPathUseCase,
    private taskGetAll: GetAllLearnigPathUseCase,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.routeDashboard = ['../'];
    this.render = true;
    this.empty = false;
    this.role = localStorage.getItem('role') as string;
    this.coachIDL = localStorage.getItem('uidUser') as string;
    this.formD = new FormGroup({
      pathD: new FormControl(),
    });
    this.frmFormReactive = new FormGroup({
      coachID: new FormControl(null),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    this.form = new FormGroup({
      coachID: new FormControl(this.coachIDL),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllPaths();
  }

  modal(
    pathID: string,
    titleToUpdate?: string,
    descriptionToUpdate?: string
  ): void {
    this.pathID = pathID;
    this.form.get('title')?.setValue(titleToUpdate);
    this.form.get('description')?.setValue(descriptionToUpdate);
  }

  //#region  functionalities
  sendData(): void {
    this.frmFormReactive.get('coachID')?.setValue(this.coachIDL);
    let subTaskCreate = this.taskCreate
      .execute(this.frmFormReactive.getRawValue())
      .subscribe({
        next: (data) => {
          this.toastr.success('LearningPath created successfully.', '', {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
          });
          this.getAllPaths();
        },
        error: (error) => {
          this.toastr.error('LearningPath was no created.', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        },
        complete: () => {
          subTaskCreate.unsubscribe();
        },
      });
  }

  sendDelete(pathId: string): void {
    let subDeleteTask = this.taskDelete.execute(pathId).subscribe({
      next: (data) => {
        this.toastr.success('LearningPath deleted successfully.', '', {
          timeOut: 2500,
          positionClass: 'toast-bottom-right',
        });
        this.getAllPaths();
      },
      error: (error) => {
        this.toastr.error('LearningPath was no deleted.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      },
      complete: () => {
        subDeleteTask.unsubscribe();
      },
    });
  }

  sendIdPath(pathID: string) {
    this.router.navigate([`/dashboard/courses/list/${pathID}`]);
  }

  sendUpdate(pathId: string): void {
    this.taskById.execute(pathId).subscribe({
      next: (data) => {
        let subUpdateTask = this.taskUpdate
          .execute({ idContent: pathId, content: this.form.getRawValue() })
          .subscribe({
            next: (data) => {
              this.toastr.success('LearningPath updated successfully.', '', {
                timeOut: 2500,
                positionClass: 'toast-bottom-right',
              });
              this.getAllPaths();
            },
            error: (error) => {
              this.toastr.error('LearningPath was no updated.', '', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
              });
            },
            complete: () => {
              subUpdateTask.unsubscribe();
            },
          });
      },
    });
  }
  //#endregion

  exploreDeliveries(pathID: string): void {
    console.log(pathID);
    this.router.navigate([`/dashboard/delivery-path-list/${pathID}`]);
  }

  //#region consults
  getAllPaths(): void {
    let subGetAllTasks = this.taskGetAll.execute().subscribe({
      next: (data) => {
        this.learningPathContent = data;
        this.empty = false;
      },
      error: (error) => {
        console.log(error);
        this.empty = true;
      },
      complete: () => {
        subGetAllTasks.unsubscribe();
      },
    });
  }
  //#endregion

  //#region util methods
  calculatePages(): void {
    this.totalPages = Math.ceil(
      this.learningPathContent.length / this.pathsPerPageTable
    );
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  searchByType(term: string): void {
    this.searching = true;
    this.filteredPaths = this.learningPathContent.filter((path) =>
      path.description.toLowerCase().includes(term.toLowerCase())
    );
  }
  //#endregion
}
