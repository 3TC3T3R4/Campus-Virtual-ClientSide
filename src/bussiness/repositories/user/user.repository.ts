import { Observable } from "rxjs";
import { CreateUserCommand } from "src/domain/commands/user/create-user-command";
import { UserModel } from "src/domain/models/user/user.model";

export abstract class UserRepository {
  abstract createUserAsync(newUserCommand: CreateUserCommand): Observable<string>;

  abstract getAllUsersAsync(): Observable<UserModel[]>;

  abstract getUserByIdAsync(uidUser: string): Observable<UserModel>;

  abstract getUserByEmailAsync(email: string): Observable<UserModel>;
}
