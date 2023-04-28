import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";




export class UpdateLearningPathDurationUseCase implements UseCase<{pathID: string, totalDuration: number}, string>{
    constructor(private learningPathRepository: LearningPathRepository) { }
  
    execute(params: { pathID: string, totalDuration: number }): Observable<string> {

      return this.learningPathRepository.updateLearningPathDurationAsync(params);
    
    }
  }