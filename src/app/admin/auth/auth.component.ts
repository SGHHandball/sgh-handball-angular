import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  TC_AUTH_LOGIN_ERROR,
  TC_AUTH_LOGIN_SUCCESS,
  TC_AUTH_LOGOUT_ERROR,
  TC_AUTH_LOGOUT_SUCCESS,
  TC_BACK,
  TC_EMAIL, TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED,
  TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL, TC_IMPRINT_LOGIN_DIALOG_ERROR_PASSWORD_REQUIRED,
  TC_LOGIN, TC_PASSWORD,
  TC_ROUTE_LOGIN,
  TranslationService
} from "../../translation.service";
import {MatDialog} from "@angular/material";
import {environment} from "../../../environments/environment";
import {DataService} from "../../data/data.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {AbstractService} from "../../shared/abstract.service";
import {Location} from "@angular/common";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  backTc = TC_BACK;
  loginTC = TC_LOGIN;
  emailTC = TC_EMAIL;
  validEmailErrorTC = TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL;
  requiredEmailErrorTC = TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED;
  requiredPasswordErrorTC = TC_IMPRINT_LOGIN_DIALOG_ERROR_PASSWORD_REQUIRED;
  passwordTC = TC_PASSWORD;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  loginVisible = false;

  constructor(
    private router: Router,
    public translationService: TranslationService,
    private dialog: MatDialog,
    private dataService: DataService,
    private abstractService: AbstractService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.initAuthState();
  }

  initAuthState() {
    if (this.router.url.includes(TC_ROUTE_LOGIN)) {
      this.loginVisible = true;
    } else {
      this.logout()
    }
  }


  logout() {
    this.dataService
      .logout()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(_ => {
          this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGOUT_SUCCESS));
        },
        error1 => {
          if (!environment.production) console.log(error1);
          this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGOUT_ERROR));
        },
        () => {
          this.location.back();
        }
      );
  }

  login() {
    const credentials = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    };
    this.dataService.login(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
          this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_SUCCESS));
        },
        error1 => {
          if (!environment.production) console.log(error1);
          this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_ERROR));
        },
        () => {
          this.location.back();
        }
      )

  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
