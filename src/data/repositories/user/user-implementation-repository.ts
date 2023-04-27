import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRepository } from "src/bussiness/repositories/user/user.repository";
import { CreateUserCommand } from "src/domain/commands/user/create-user-command";
import { UserModel } from "src/domain/models/user/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  constructor(private http: HttpClient) {
    super();
  }

  createUserAsync(newUserCommand: CreateUserCommand): Observable<string> {
    return this.http.post<string>(`${environment.urlApiUsers}`,
      newUserCommand
    );
  }
  getAllUsersAsync(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      `${environment.urlApiUsers}`
    );
  }
  getUserByIdAsync(uidUser: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      `${environment.urlApiUsers}/ID?Id=${uidUser}`
    );
  }
  getUserByEmailAsync(email: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      `${environment.urlApiUsers}/Email?email=${email}`
    );
  }
}
