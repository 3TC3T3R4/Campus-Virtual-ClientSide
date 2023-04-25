import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { NewLearningPathCommand } from 'src/domain/commands/learningpath/newLearningPathCommands';
import { LearningPathRepository } from 'src/bussiness/repositories/learningpath/learningpath.repository';

export class CreateLearningPathUseCase implements UseCase<NewLearningPathCommand, string> {
    constructor(private learningPathRepository: LearningPathRepository) {}

    execute(command: NewLearningPathCommand): Observable<string> {
    
        return this.learningPathRepository.createLearningPathAsync(command);
    
    }

}