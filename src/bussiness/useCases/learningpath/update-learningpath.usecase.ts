import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathModel } from '../../../domain/models/learningpath/learningpath';
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";
import { Observable } from "rxjs";
import { NewLearningPathCommand } from '../../../domain/commands/learningpath/newLearningPathCommands';



export class updateLearningPathByIdUseCase implements UseCase<{ idContent: string, content: NewLearningPathCommand }, string>{
  constructor(private learningPathRepository: LearningPathRepository) { }

  execute(params: { idContent: string, content: NewLearningPathCommand }): Observable<string> {

    return this.learningPathRepository.updateLearningPathByIdAsync(params);

  }



}
