import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";
import { ContentModel } from "src/domain/models/content/content.model";

export class GetContentByIdUseCase implements UseCase<string, ContentModel>{

    constructor(private repository: ContentRepository){}

    execute(idContent: string): Observable<ContentModel> {
        return this.repository.GetContentByIdAsync(idContent);
    }

}