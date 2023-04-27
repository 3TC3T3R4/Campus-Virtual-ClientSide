import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningPathRepository } from 'src/bussiness/repositories/learningpath/learningpath.repository';
import { NewLearningPathCommand } from 'src/domain/commands/learningpath/newLearningPathCommands';
import { LearningPathModel } from 'src/domain/models/learningpath/learningpath';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LearningPathImplementationRepository extends LearningPathRepository {


  constructor(private http: HttpClient) {
    super();
  }


  getLearningPathByCoahAsync(coachID: string): Observable<LearningPathModel[]> {

    return this.http.get<LearningPathModel[]>(
      `${environment.urlApiCampus}api/LearningPath/GetByCoach?id=${coachID}`
    );

  }


  createLearningPathAsync(
    newLearningPathCommand: NewLearningPathCommand
  ): Observable<LearningPathModel> {
    return this.http.post<LearningPathModel>(
      `${environment.urlApiCampus}api/LearningPath/CreateLearningPath`,
      newLearningPathCommand
    );

  }


  getAllLearningPathAsync(): Observable<LearningPathModel[]> {

    return this.http.get<LearningPathModel[]>(
      `${environment.urlApiCampus}api/LearningPath`
    );

  }

  getLearningPathByIdAsync(pathID: string): Observable<LearningPathModel> {

    return this.http.get<LearningPathModel>(
      `${environment.urlApiCampus}api/LearningPath/GetById?id=${pathID}`
    );


  }


  deleteLearningPathAsync(pathID: string): Observable<string> {

    return this.http.delete<string>(
      `${environment.urlApiCampus}api/LearningPath/${pathID}`
    );


  }

   updateLearningPathByIdAsync(params: { idContent: string; content: NewLearningPathCommand; }): Observable<string> {
    
     return this.http.put<string>(
       `${environment.urlApiCampus}api/LearningPath?id=${params.idContent}`, params.content);
  }

  updateLearningPathDurationAsync(pathID: string, totalDuration: number): Observable<string> {

    return this.http.patch<string>(
      `${environment.urlApiCampus}api/LearningPath/UpdateDuration?id=${pathID}&totalDuration=${totalDuration}`,
      null
    );

  }



}
