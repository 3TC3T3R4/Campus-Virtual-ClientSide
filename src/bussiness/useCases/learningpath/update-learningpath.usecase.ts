import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathModel } from '../../../domain/models/learningpath/learningpath';
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";
import { Observable } from "rxjs";



export class updateLearningPathByIdUseCase implements UseCase< [string, LearningPathModel], LearningPathModel>{
    constructor(private learningPathRepository: LearningPathRepository) { }
  
    execute([pathID, learningPath]: [string,LearningPathModel]): Observable<LearningPathModel> {

      return this.learningPathRepository.updateLearningPathByIdAsync(pathID,learningPath);
    
    }
 


}
  