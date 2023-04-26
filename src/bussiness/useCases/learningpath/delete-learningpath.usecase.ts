import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";



export class DeleteLearnigPathUseCase implements UseCase<string, string>{
    constructor(private learningpathRepository: LearningPathRepository) { }
  
    execute(pathID: string): Observable<string> {
      return this.learningpathRepository.deleteLearningPathAsync(pathID);
    }
  }