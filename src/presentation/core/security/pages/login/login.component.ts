import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/userAuth/auth.service';
// import { AuthService } from '../../services/userAuth/auth.service';

@Component({
  selector: 'sofka-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  routeLogIn: string[];
  frmLogin: FormGroup;
  constructor(private readonly auth$: AuthService
  ) {
    this.clearLocalStorage();
    this.routeLogIn = ['log-in'];
    this.frmLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  ngOnInit(): void { }

  signIn(user: string, password: string): void {
    this.auth$.SignIn(user, password);
  }

  // signUp(user: string, password: string): void {
  //   this.auth$.SignUp(user, password);
  // }

  clearLocalStorage(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('uidUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('stateUser');
  }
}
