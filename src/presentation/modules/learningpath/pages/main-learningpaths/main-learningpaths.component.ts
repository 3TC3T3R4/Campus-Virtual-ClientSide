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
import { ConfigurePathCourseProfileUseCase } from '../../../../../bussiness/useCases/course/configurePath.usecase';
import { GetCourseActiveUseCase } from 'src/bussiness/useCases/course/getCourseActive.usecase';
import { CourseModel } from 'src/domain/models/course/course.model';
import { GetCourseByIdProfileUseCase } from 'src/bussiness/useCases/course/getCourseById.usecase';
import { AssingToPathModel } from 'src/domain/commands/course/assingToPath.model';
import { UpdateLearningPathDurationUseCase } from 'src/bussiness/useCases/learningpath/update-learningpath-duration.usecase';
import { GetCourseByPathIdProfileUseCase } from 'src/bussiness/useCases/course/getCoursesByPathId.usecase';
import { ToastrService } from 'ngx-toastr';
import { GetLearningPathByTraineeUseCase } from 'src/bussiness/useCases/learningpath/get-learningpath-by-trainee.usecase';

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
  formAdd: FormGroup;
  learningPathContent!: LearningPathModel[];
  pathID!: string;
  titleToUpdate: string = '';
  descriptionToUpdate: string = '';
  role!: string;
  formConten: LearningPathModel | undefined;
  coachIDL: string | undefined;
  traineeID: string;
  finalContent: NewLearningPathCommand | undefined;
  learningPathContentWithC: CourseModel[] | undefined;
  selectedContent: CourseModel | undefined;
  objectPathAndCourse: AssingToPathModel | undefined; //search
  searching = false;
  filteredPaths!: LearningPathModel[];

  //pagination
  pathsPerPageTable: number = 6;
  page: number = 1;
  pages: number[] = [];
  totalPages: number = 0;

  constructor(
    private taskCourseById: GetCourseByIdProfileUseCase,
    private taskAddCourse: ConfigurePathCourseProfileUseCase,
    private taskSearchCourse: GetCourseActiveUseCase,
    private taskDelete: DeleteLearnigPathUseCase,
    private taskById: GetLearningPathByIdUseCase,
    private taskUpdate: updateLearningPathByIdUseCase,
    private taskCreate: CreateLearningPathUseCase,
    private taskGetAll: GetAllLearnigPathUseCase,
    private taskGetByTrainee: GetLearningPathByTraineeUseCase,
    private router: Router,
    private taskUpdateDuration: UpdateLearningPathDurationUseCase,
    private taskByPath: GetCourseByPathIdProfileUseCase,
    private toastr: ToastrService
  ) {
    this.routeDashboard = ['../'];
    this.empty = false;
    this.role = localStorage.getItem('role') as string;
    this.coachIDL = localStorage.getItem('uidUser') as string;
    this.traineeID = localStorage.getItem('uidUser') as string;
    this.formD = new FormGroup({
      pathD: new FormControl(),
    });
    this.formAdd = new FormGroup({
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
    setTimeout(() => {
      this.render = true;
    }, 1000);
  }

  ngOnInit(): void {
    switch (this.role) {
      case '1':
        this.getAllPaths();
        break;
      case '2':
        this.getAllPathsByTrainee();
        break;
    }
  }

  modal(
    pathID: string,
    titleToUpdate?: string,
    descriptionToUpdate?: string
  ): void {
    this.pathID = pathID;
    this.form.get('title')?.setValue(titleToUpdate);
    this.form.get('description')?.setValue(descriptionToUpdate);
    this.handlerDuration(this.pathID);
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
    this.router.navigate([`/dashboard/delivery-path-list/${pathID}`]);
  }

  //#region consults
  getAllPaths(): void {
    let subGetAllTasks = this.taskGetAll.execute().subscribe({
      next: (data) => {
        this.learningPathContent = data;
        let subFilter = this.taskSearchCourse.execute().subscribe({
          next: (data2) => {
            this.learningPathContentWithC = data2.filter(
              (course) => course.stateCourse === 1
            );
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            subFilter.unsubscribe();
          },
        });
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

  getAllPathsByTrainee(): void {
    let subGetAllTasks = this.taskGetByTrainee
      .execute(this.traineeID)
      .subscribe({
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

  handlerDuration(pathID: string): void {
    let subAllCoursesByPath = this.taskByPath.execute(pathID).subscribe({
      next: (data) => {
        let durationTotal = data.reduce(
          (acumulador, data) => acumulador + data.duration,
          0
        );
        let subUpdateDuration = this.taskUpdateDuration
          .execute({
            pathID: pathID,
            totalDuration: durationTotal,
          })
          .subscribe({
            next: (data) => {
              this.getAllPaths();
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              subUpdateDuration.unsubscribe();
            },
          });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        subAllCoursesByPath.unsubscribe();
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

  addCourses(pathIDB: string): void {
    if (this.selectedContent && this.selectedContent.courseID) {
      let subGetUniqueCourse = this.taskCourseById
        .execute(this.selectedContent.courseID)
        .subscribe({
          next: (data) => {
            this.objectPathAndCourse = {
              CourseID: data.courseID,
              PathID: pathIDB,
            };
            let subAddCourse = this.taskAddCourse
              .execute(this.objectPathAndCourse)
              .subscribe({
                next: (data) => {
                  this.handlerDuration(pathIDB);
                },
                error: (error) => {
                  this.toastr.error('Course was no added.', '', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right',
                  });
                },
                complete: () => {
                  subAddCourse.unsubscribe();
                },
              });
            console.log(data);
            this.toastr.success('Course added successfully.', '', {
              timeOut: 2500,
              positionClass: 'toast-bottom-right',
            });
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            subGetUniqueCourse.unsubscribe();
          },
        });
    } else {
      console.log('El contenido seleccionado es inválido.');
      alert('You cant add a course with items empty');
    }
    // if (this.selectedContent && this.selectedContent.courseID) {
    //     this.taskCourseById.execute(this.selectedContent.courseID).subscribe({
    //       next: (data) => {

    //         console.log(data);

    //         this.objectPathAndCourse = { CourseID: data.courseID, PathID: pathIDB };

    //     this.taskByPath.execute(pathIDB).subscribe({
    //         next: (data) => {
    //           let durationTotal = data.reduce((acumulador, data) => acumulador + data.duration, 0);
    //         }

    //     });
    //        this.taskAddCourse.execute(this.objectPathAndCourse).subscribe({
    //            next: (data) => {
    //             this.taskUpdateDuration.execute({ pathID: pathIDB, totalDuration: data.duration}).subscribe({
    //               next: (data) => {
    //                 console.log(data);
    //                 alert('Duration updated successfully');
    //               }
    //             })

    //           }
    //         });

    //           console.log(data);
    //           alert('Course added successfully');
    //         }

    //       });
    //     } else {
    //   // La variable content es undefined o no tiene una propiedad id_content
    //   console.log('El contenido seleccionado es inválido.');
    //   alert('You cant add a course with items empty');
    // }
  }
}
