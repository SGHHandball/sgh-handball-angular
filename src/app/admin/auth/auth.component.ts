import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  TC_AUTH_LOGIN_ERROR,
  TC_AUTH_LOGIN_SUCCESS, TC_AUTH_LOGOUT_ERROR, TC_AUTH_LOGOUT_SUCCESS, TC_ROUTE_LOGIN,
  TranslationService
} from "../../translation.service";
import {MatDialog} from "@angular/material";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {environment} from "../../../environments/environment";
import {DataService} from "../../data/data.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {AbstractService} from "../../shared/abstract.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(
    private router: Router,
    public translationService: TranslationService,
    private dialog: MatDialog,
    private dataService: DataService,
    private abstractService: AbstractService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.initAuthState();
  }

  initAuthState() {
    if (this.router.url.includes(TC_ROUTE_LOGIN)) {
      this.openLoginDialog();
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

  openLoginDialog() {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth =>
          this.dialog.open(LoginDialogComponent, {
              width: dialogWidth
            }
          ).afterClosed()
        ),
        switchMap(credentials => {
          if (credentials) {
            return this.dataService.login(credentials)
          }
          return of(undefined);
        })
      ).subscribe(result => {
        if (result) {
          this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_SUCCESS));
        }
        this.location.back();
      },
      error1 => {
        if (!environment.production) console.log(error1);
        this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_ERROR));
        this.location.back();
      }
    );
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
