import { Observable } from 'rxjs';
import { LearningPathModel } from '../../../domain/models/learningpath/learningpath';
import { NewLearningPathCommand } from 'src/domain/commands/learningpath/newLearningPathCommands';

export abstract class LearningPathRepository {

  abstract createLearningPathAsync(
    newLearningPathCommand: NewLearningPathCommand

  ): Observable<LearningPathModel>;

  abstract getAllLearningPathAsync(): Observable<LearningPathModel[]>;

  abstract getLearningPathByIdAsync(
    pathID: string
  ): Observable<LearningPathModel>;

  abstract updateLearningPathByIdAsync(params: { idContent: string, content: NewLearningPathCommand }): Observable<string>;

  abstract deleteLearningPathAsync(pathID: string): Observable<string>;

  abstract getLearningPathByCoahAsync(coachID: string): Observable<LearningPathModel[]>;

  abstract updateLearningPathDurationAsync(pathID: string, totalDuration: number): Observable<string>;
}
