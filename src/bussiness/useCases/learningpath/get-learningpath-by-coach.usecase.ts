import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { LearningPathRepository } from "src/bussiness/repositories/learningpath/learningpath.repository";
import { LearningPathModel } from "src/domain/models/learningpath/learningpath";

export class GetLearningPathByCoachUseCase implements UseCase<string, LearningPathModel[]> {
  constructor(private learningPathRepository: LearningPathRepository) { }

  execute(pathID: string): Observable<LearningPathModel[]> {
    return this.learningPathRepository.getLearningPathByCoahAsync(pathID);
  }
}
