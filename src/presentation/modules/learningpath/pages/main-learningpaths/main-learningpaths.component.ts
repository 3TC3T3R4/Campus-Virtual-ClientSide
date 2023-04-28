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
  frmFormReactive: FormGroup;
  form: FormGroup;
  formD: FormGroup;
  formAdd: FormGroup;
  learningPathContent: LearningPathModel[] | undefined;
  formConten: LearningPathModel | undefined;
  coachIDL: string | undefined;
  finalContent: NewLearningPathCommand | undefined;
  learningPathContentWithC: CourseModel[] | undefined;
  selectedContent: CourseModel | undefined;
  objectPathAndCourse: AssingToPathModel | undefined;
  constructor(private taskCourseById: GetCourseByIdProfileUseCase ,private taskAddCourse: ConfigurePathCourseProfileUseCase,private taskSearchCourse: GetCourseActiveUseCase,
    private taskDelete: DeleteLearnigPathUseCase, private taskById: GetLearningPathByIdUseCase, private taskUpdate: updateLearningPathByIdUseCase, private taskCreate: CreateLearningPathUseCase, private taskGetAll: GetAllLearnigPathUseCase,
    private router: Router, private taskUpdateDuration: UpdateLearningPathDurationUseCase
  ) {
    this.routeDashboard = ['../'];
    this.render = true;
    this.coachIDL = localStorage.getItem('uidUser') as string;
    this.formD = new FormGroup({
      pathD: new FormControl()
    });
    this.formAdd = new FormGroup({
      pathD: new FormControl()
    });
    this.frmFormReactive = new FormGroup({
      coachID: new FormControl(null),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6)

      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.min(10)
      ])

    });

    this.form = new FormGroup({
      coachID: new FormControl(this.coachIDL),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.min(10)
      ]),

    });



  }

  sendData(): void {

    if (this.frmFormReactive.invalid) {

      alert('No puedes crear un articulo vacio, llenar todos los campos');

    }

    this.frmFormReactive.get('coachID')?.setValue(this.coachIDL);

    console.log('sendData', this.frmFormReactive);
    this.taskCreate.execute(this.frmFormReactive.getRawValue()).subscribe({
      next: (data) => {
        console.log(data);
        alert('LearningPath created successfully');
        this.router.navigate(['./dashboard']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }

    });



  }
  ngOnInit(): void {
    this.taskGetAll.execute().subscribe({


      next: (data) => {
        this.learningPathContent = data;
        this.taskSearchCourse.execute().subscribe({
          next: (data2) => {
            this.learningPathContentWithC = data2.filter((course) => course.stateCourse === 1);
            console.log(this.learningPathContentWithC);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });




  }

  sendDelete(pathId: string): void {

    this.taskDelete.execute(pathId).subscribe({
      next: (data) => {
        console.log(data);
        alert('LearningPath Delete successfully');
        this.router.navigate(['./dashboard']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }


    });
  }


  sendIdPath(pathID: string) {

    this.router.navigate([`/dashboard/courses/list/${pathID}`]);


  }



  sendUpdate(pathId: string): void {
    console.log(pathId, this.form.getRawValue());
    if (this.form.invalid) {

      alert('You cant Update a LearningPath with items empty');

    } else {

      this.taskById.execute(pathId).subscribe({

        next: (data) => {

          this.taskUpdate.execute({ idContent: pathId, content: this.form.getRawValue() }).subscribe({

            next: (data) => {
              console.log(data);
              alert('LearningPath updated successfully');
              this.router.navigate(['./dashboard']);
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              console.log('complete');
            }

          });


        }


      });


    }





  }

  exploreDeliveries(pathID: string): void {
    console.log(pathID);
    this.router.navigate([`/dashboard/delivery-path-list/${pathID}`]);


  }



  addCourses(pathIDB: string):void {

    if (this.selectedContent && this.selectedContent.courseID) {
        this.taskCourseById.execute(this.selectedContent.courseID).subscribe({
          next: (data) => {
            console.log(data);
        this.objectPathAndCourse = { CourseID: data.courseID, PathID: pathIDB };
           this.taskAddCourse.execute(this.objectPathAndCourse).subscribe({
               next: (data) => {
                this.taskUpdateDuration.execute({ pathID: pathIDB, totalDuration: data.duration}).subscribe({


                });
              console.log(data);
              alert('Course added successfully');
            }
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      // La variable content es undefined o no tiene una propiedad id_content
      console.log('El contenido seleccionado es inválido.');
      alert('You cant add a course with items empty');
    }

  }







}
