import { Observable } from "rxjs";
import { CreateContentCommand } from "src/domain/commands/content/create-content.command";
import { UpdateContentCommand } from "src/domain/commands/content/update-content.command";
import { ContentModel } from "src/domain/models/content/content.model";

export abstract class ContentRepository {
    abstract CreateContentAsync( content : CreateContentCommand) : Observable<string>
    abstract UpdateContentAsync( idContent : string, content : UpdateContentCommand) : Observable<string>
    abstract DeleteContentAsync(idContent : string) : Observable<string>
    abstract GetContentAsync() : Observable<ContentModel[]>
    abstract GetContentByIdAsync(  idContent : string ) : Observable<ContentModel>
    abstract GetContentByCourseIdAsync( idCourse : string) : Observable<ContentModel[]>
}