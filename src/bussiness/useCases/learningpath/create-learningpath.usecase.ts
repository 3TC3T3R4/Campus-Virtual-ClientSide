import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { NewLearningPathCommand } from 'src/domain/commands/learningpath/newLearningPathCommands';
import { LearningPathRepository } from 'src/bussiness/repositories/learningpath/learningpath.repository';
import { LearningPathModel } from 'src/domain/models/learningpath/learningpath';

export class CreateLearningPathUseCase implements UseCase<NewLearningPathCommand, LearningPathModel> {
    constructor(private learningPathRepository: LearningPathRepository) {}

    execute(command: NewLearningPathCommand): Observable<LearningPathModel> {
    
        return this.learningPathRepository.createLearningPathAsync(command);
    
    }

}