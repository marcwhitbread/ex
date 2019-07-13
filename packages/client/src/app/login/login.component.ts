import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from './../services/authentication.service';

import { User } from './../users/user';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  user: User;
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {

    this.form = fb.group({
      'email': ['test1@gmail.com', Validators.required],
      'password': ['test', Validators.required],
    });

  }

  ngOnInit() { }

  login(): void {

    if (this.form.valid) {
      this.authenticationService
        .login(
          this.form.value.email,
          this.form.value.password,
        )
        .subscribe(
          (auth: Authentication) => {
            this.router.navigate(['/', 'plans']);
          },
          err => {}
        );
    }

  }

}
