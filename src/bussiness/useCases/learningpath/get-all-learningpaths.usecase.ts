import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";
import { LearningPathModel } from "src/domain/models/learningpath/learningpath";




export class GetAllLearnigPathUseCase implements UseCase<void, LearningPathModel[]>{
    constructor(private learningpathRepository: LearningPathRepository) { }
  
    execute(): Observable<LearningPathModel[]> {
      return this.learningpathRepository.getAllLearningPathAsync();
    }
  }
  