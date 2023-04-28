import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContentRepository } from "src/bussiness/repositories/content/content.repository";
import { CreateContentCommand } from "src/domain/commands/content/create-content.command";
import { UpdateContentCommand } from "src/domain/commands/content/update-content.command";
import { ContentModel } from "src/domain/models/content/content.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ContentImplementationRepository extends ContentRepository {

    constructor(private http: HttpClient ){
        super();
    }

    CreateContentAsync(content: CreateContentCommand): Observable<string> {
        return this.http.post<string>(`${environment.urlApiCampus}api/Content`, content);
    }
    UpdateContentAsync(params: { idContent: string; content: UpdateContentCommand; }): Observable<string> {
        return this.http.put<string>(`${environment.urlApiCampus}api/Content?idContent=${params.idContent}`, params.content);
    }
    DeleteContentAsync(idContent: string): Observable<string> {
        return this.http.delete<string>(`${environment.urlApiCampus}api/Content/${idContent}`);
    }
    GetAllContentAsync(): Observable<ContentModel[]> {
        return this.http.get<ContentModel[]>(`${environment.urlApiCampus}api/Content`);
    }
    GetContentByIdAsync(idContent: string): Observable<ContentModel> {
        return this.http.get<ContentModel>(`${environment.urlApiCampus}api/Content/${idContent}`);
    }
    GetContentByCourseIdAsync(idCourse: string): Observable<ContentModel[]> {
        return this.http.get<ContentModel[]>(`${environment.urlApiCampus}Course/${idCourse}`);
    }

}