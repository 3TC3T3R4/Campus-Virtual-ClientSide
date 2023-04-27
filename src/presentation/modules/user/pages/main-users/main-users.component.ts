import { Component, OnInit } from '@angular/core';
import { GetAllUsersUseCase } from '../../../../../bussiness/useCases/user/get-all-users.usecase';
import { UserModel } from 'src/domain/models/user/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/presentation/core/security/services/userAuth/auth.service';

@Component({
  selector: 'sofka-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {
  //routes
  routeDashboard: string[];

  //variables
  render!: boolean;
  empty: boolean;
  usersList!: UserModel[];

  //search
  searching = false;
  filteredUsers!: UserModel[];

  //pagination
  usersPerPageTable: number = 6;
  page: number = 1;
  pages: number[] = [];
  totalPages: number = 0;

  //forms
  frmCreateUser: FormGroup;

  constructor(private getAllUsersUseCase: GetAllUsersUseCase, private $auth: AuthService) {
    this.routeDashboard = ['../'];
    this.empty = true;
    this.frmCreateUser = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: new FormControl('', [Validators.required]),
    });
    this.getAllUsers();
    setTimeout(() => {
      this.calculatePages();
    }, 500);
    setTimeout(() => {
      this.render = true;
    }, 1500);
  }

  ngOnInit(): void {
  }

  //#region create user
  sendData() {
    this.$auth.SignUp(this.frmCreateUser.value.email, this.frmCreateUser.value.password, this.frmCreateUser.value.role);
  }
  //#endregion

  //#region consults
  getAllUsers() {
    let subGetUsers = this.getAllUsersUseCase.execute().subscribe({
      next: (data) => {
        this.usersList = data;
        this.empty = false;
      },
      error: (error) => {
        this.empty = true;
      },
      complete: () => {
        subGetUsers.unsubscribe();
      }
    });
  }
  //#endregion

  //#region util methods
  togglePassword(uidUser: string) {
    const passwordUserTable = document.getElementById(uidUser) as HTMLInputElement;
    if (passwordUserTable.type === "password") {
      passwordUserTable.type = "text";
    } else {
      passwordUserTable.type = "password";
    }
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.usersList.length / this.usersPerPageTable);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  searchByType(term: string): void {
    this.searching = true;
    this.filteredUsers = this.usersList.filter(user =>
      user.email.toLowerCase().includes(term.toLowerCase())
    );
  }
  //#endregion
}
