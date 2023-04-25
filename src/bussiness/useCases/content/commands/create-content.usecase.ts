import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";
import { CreateContentCommand } from "src/domain/commands/content/create-content.command";

export class CreateContentUseCase implements UseCase<CreateContentCommand, string>{

    constructor(private repository: ContentRepository){}

    execute(content: CreateContentCommand): Observable<string> {
        return this.repository.CreateContentAsync(content);
    }

}