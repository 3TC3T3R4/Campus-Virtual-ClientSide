import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        localStorage.setItem(
          'userName',
          result.user?.displayName ? result.user?.displayName : 'User'
        );
        localStorage.setItem('uidUser', result.user?.uid as string);
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch(error => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        localStorage.setItem(
          'userName',
          result.user?.displayName ? result.user?.displayName : 'User'
        );
        localStorage.setItem('uidUser', result.user?.uid as string);
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('uidUser');
      localStorage.removeItem('userName');
      localStorage.removeItem('userAvatar');
      this.router.navigate(['log-in']);
    });
  }
}
