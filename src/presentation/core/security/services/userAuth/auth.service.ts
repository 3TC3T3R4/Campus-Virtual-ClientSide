import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GetUserByEmailUseCase } from 'src/bussiness/useCases/user/get-user-by-email.usecase';
import { UserModel } from 'src/domain/models/user/user.model';
import { ToastrService } from 'ngx-toastr';
import { CreateUserUseCase } from 'src/bussiness/useCases/user/create-user.usecase';
import { CreateUserCommand } from 'src/domain/commands/user/create-user-command';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private createUserUseCase: CreateUserUseCase
  ) {
    localStorage.removeItem('uidUserCreated');
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    let existingUser!: UserModel;
    //consult if the user exists
    let subGetUniqueUser = this.getUserByEmailUseCase.execute(email).subscribe({
      next: (user) => {
        existingUser = user;
        if (existingUser != null) {
          localStorage.setItem('email', existingUser.email);
          localStorage.setItem('uidUser', existingUser.uidUser);
          localStorage.setItem('role', existingUser.role.toString());
        }
      },
      error: (err) => {
        console.log('there is no user');
      },
      complete: () => {
        subGetUniqueUser.unsubscribe();
      },
    });

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            setTimeout(() => {
              this.router.navigate(['dashboard']);
            }, 3000);
          }
        });
      })
      .catch((error) => {
        this.toastr.warning('E-mail or password fields are wrong.', '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, role: string) {
    let existingUser!: UserModel;
    let userToCreate!: CreateUserCommand;

    //consult if the user exists
    let subGetUniqueUser = this.getUserByEmailUseCase.execute(email).subscribe({
      next: (user) => {
        existingUser = user;
        if (existingUser != null) {
          this.toastr.info(`User already exist: ` + email, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        }
      },
      error: (err) => {
        console.log('there is no user');
      },
      complete: () => {
        subGetUniqueUser.unsubscribe();
      },
    });

    //if the user does not exist, create it in firebase
    let userCreation: any;
    if (existingUser == undefined) {
      userCreation = this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          localStorage.setItem('uidUserCreated', result.user?.uid as string);

          //create user in database
          setTimeout(() => {
            userToCreate = {
              uidUser: localStorage.getItem('uidUserCreated') as string,
              email: email,
              password: password,
              role: parseInt(role),
            };
            let subCreateUser = this.createUserUseCase
              .execute(userToCreate)
              .subscribe({
                next: (user) => {
                  this.toastr.success(`User created: ` + email, '', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right',
                  });
                },
                error: (err) => {
                  this.toastr.error(`Error creating user: ` + email, '', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right',
                  });
                },
                complete: () => {
                  subCreateUser.unsubscribe();
                },
              });
          }, 500);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    return userCreation;
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('uidUser');
      localStorage.removeItem('uidUserCreated');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      this.router.navigate(['log-in']);
    });
  }
}
