import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";
import { UpdateContentCommand } from "src/domain/commands/content/update-content.command";

export class UpdateContentUseCase implements UseCase<{idContent: string, content : UpdateContentCommand}, string>{

    constructor(private repository: ContentRepository){}

    execute(params : {idContent : string, content : UpdateContentCommand}): Observable<string> {
        return this.repository.UpdateContentAsync(params);
    }

}