import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";

export class DeleteContentUseCase implements UseCase<string, string>{

    constructor(private repository: ContentRepository){}

    execute(idContent : string): Observable<string> {
        return this.repository.DeleteContentAsync(idContent);
    }

}