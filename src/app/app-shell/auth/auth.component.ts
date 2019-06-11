import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  TC_ADMIN,
  TC_AUTH_LOGIN_ERROR,
  TC_AUTH_LOGIN_SUCCESS, TC_AUTH_LOGOUT_ERROR, TC_AUTH_LOGOUT_SUCCESS,
  TC_LOGIN,
  TC_LOGOUT,
  TC_ROUTE_IMPRINT, TC_USERS,
  TranslationService
} from "../../translation.service";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Credentials, LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth, User} from 'firebase/app';
import {AdminService} from "../../admin/admin.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends AbstractComponent {

  loginTC = TC_LOGIN;
  logoutTC = TC_LOGOUT;
  usersTC = TC_USERS;

  constructor(breakpointObserver: BreakpointObserver,
              private router: Router,
              public translationService: TranslationService,
              private dialog: MatDialog,
              public adminService: AdminService,
              public afAuth: AngularFireAuth,
              private snackBar: MatSnackBar
  ) {
    super(breakpointObserver);
  }

  isAuthBtnVisible() {
    return this.router.url == '/' + TC_ROUTE_IMPRINT;
  }

  routeToAdmin() {
    this.router.navigate([TC_USERS])
  }

  handleCLick() {
    if (this.adminService.user) {
      this.logout();
    } else {
      this.openLoginDialog();
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.openSnackBar(this.translationService.get(TC_AUTH_LOGOUT_SUCCESS));
    }).catch(error => {
      console.log(error);
      this.openSnackBar(this.translationService.get(TC_AUTH_LOGOUT_ERROR));
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: this.dialogWidth
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Credentials) {
        this.login(result);
      }
    });
  }

  login(credentials: Credentials) {
    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .finally(() => {
        this.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_SUCCESS));
      }).catch((error) => {
      if (!environment.production) console.error(error);
      this.openSnackBar(this.translationService.get(TC_AUTH_LOGIN_ERROR));
    });
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

}
