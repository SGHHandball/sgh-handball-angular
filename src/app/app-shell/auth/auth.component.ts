import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  TC_AUTH_LOGIN_ERROR,
  TC_AUTH_LOGIN_SUCCESS, TC_AUTH_LOGOUT_ERROR, TC_AUTH_LOGOUT_SUCCESS,
  TC_LOGIN,
  TC_LOGOUT,
  TC_ROUTE_IMPRINT, TC_ROUTE_SEASONS, TC_USERS,
  TranslationService
} from "../../translation.service";
import {MatDialog} from "@angular/material";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {AngularFireAuth} from "@angular/fire/auth";
import {AdminService} from "../../admin/admin.service";
import {environment} from "../../../environments/environment";
import {DataService} from "../../data/data.service";
import {share, switchMap, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {User} from "firebase";
import {AbstractService} from "../../shared/abstract.service";
import {Credentials} from "../../model/Credentials";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginTC = TC_LOGIN;
  logoutTC = TC_LOGOUT;
  usersTC = TC_USERS;

  destroy$ = new Subject();
  adminUser = this.adminService.isUserAdmin().pipe(share());

  user: User;

  constructor(
    private router: Router,
    public translationService: TranslationService,
    private dialog: MatDialog,
    public adminService: AdminService,
    private dataService: DataService,
    public afAuth: AngularFireAuth,
    private abstractService: AbstractService
  ) {
  }

  isAuthBtnVisible() {
    return this.router.url == '/' + TC_ROUTE_IMPRINT;
  }

  routeToAdmin() {
    this.router.navigate([TC_USERS])
  }

  routeToSeasons() {
    this.router.navigate([TC_ROUTE_SEASONS])
  }

  ngOnInit(): void {
    this.initUser();
  }

  initUser() {
    this.dataService.getUser()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
          this.user = user;
        }
      );
  }

  handleCLick() {
    if (this.user) {
      this.logout();
    } else {
      this.openLoginDialog();
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGOUT_SUCCESS));
    }).catch(error => {
      if (!environment.production) console.log(error);
      this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGOUT_ERROR));
    });
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
        )
      ).subscribe(result => {
      this.login(result);
    });
  }

  login(credentials: Credentials) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .finally(() => {
        this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_SUCCESS));
      }).catch((error) => {
      if (!environment.production) console.error(error);
      this.abstractService.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_ERROR));
    });
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
