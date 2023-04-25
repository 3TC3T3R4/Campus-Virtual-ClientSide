import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";




export class UpdateLearningPathDurationUseCase implements UseCase<[string, number], string>{
    constructor(private learningPathRepository: LearningPathRepository) { }
  
    execute([pathID, totalDuration]: [string, number] ): Observable<string> {

      return this.learningPathRepository.updateLearningPathDurationAsync(pathID,totalDuration);
    
    }
  }