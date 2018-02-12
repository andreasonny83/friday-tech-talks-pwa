// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public authState: Observable<firebase.User>;

  private userDetails: firebase.User;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.authState = firebaseAuth.authState;
    this.userDetails = null;

    this.authState
      .subscribe(user => this.userDetails = user || null);
  }

  isLoggedIn() {
    return !!this.userDetails;
  }

  signIn(email, password) {
    const credential = firebase.auth.EmailAuthProvider
      .credential(email, password);

    return this.firebaseAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  signOut() {
    this.firebaseAuth.auth
      .signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
