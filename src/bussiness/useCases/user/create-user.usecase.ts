import { UseCase } from "src/base/utils/IUseCase";
import { CreateUserCommand } from "src/domain/commands/user/create-user-command";
import { UserRepository } from '../../repositories/user/user.repository';
import { Observable } from "rxjs";

export class CreateUserUseCase implements UseCase<CreateUserCommand, string>{
  constructor(private userRepository: UserRepository) { }
  execute(command: CreateUserCommand): Observable<string> {
    return this.userRepository.createUserAsync(command);
  }
}
