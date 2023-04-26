import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";
import { ContentModel } from "src/domain/models/content/content.model";

export class GetAllContentUseCase implements UseCase<string, ContentModel[]>{

    constructor(private repository: ContentRepository){}

    execute(): Observable<ContentModel[]> {
        return this.repository.GetAllContentAsync();
    }

}