// Copyright (c) 2018 AndreaSonny <andreasonny83@gmail.com> (https://github.com/andreasonny83)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: boolean;
  waiting: boolean;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.authService.signOut();
  }

  signIn() {
    this.error = false;
    this.waiting = true;

    this.authService
      .signIn(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value,
      )
      .then(res => this.router.navigate(['home']))
      .catch((err) => {
        this.error = true;
        this.waiting = false;
        this.loginForm.markAsPristine();
      });
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.email, Validators.required ] ],
      password: ['', [ Validators.required, Validators.minLength(5) ] ],
    });
  }
}
