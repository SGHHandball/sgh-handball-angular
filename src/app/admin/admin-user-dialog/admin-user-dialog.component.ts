import {Component, OnDestroy} from '@angular/core';
import {
  TC_ADMIN_ADD_NEW_USER,
  TC_ADMIN_ADD_NEW_USER_ERROR, TC_ADMIN_ADD_NEW_USER_SUCCESS,
  TC_ADMIN_SGH_USER_LAST_NAME,
  TC_ADMIN_SGH_USER_PRE_NAME,
  TC_ADMIN_USER_DIALOG_PW_TO_SHORT,
  TC_BACK,
  TC_EMAIL, TC_GENERAL_REQUIRED_ERROR,
  TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED,
  TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL,
  TC_PASSWORD,
  TC_SAVE,
  TranslationService
} from "../../translation.service";
import {FormControl, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {MatDialogRef, MatSnackBar} from "@angular/material";
import {Subject} from "rxjs";
import {catchError, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-admin-user-dialog',
  templateUrl: './admin-user-dialog.component.html',
  styleUrls: ['./admin-user-dialog.component.css']
})
export class AdminUserDialogComponent implements OnDestroy {

  addNewUserHeader = TC_ADMIN_ADD_NEW_USER;
  backTc = TC_BACK;
  saveTC = TC_SAVE;
  emailTC = TC_EMAIL;
  validEmailErrorTC = TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL;
  requiredEmailErrorTC = TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED;
  passwordTC = TC_PASSWORD;
  preNameTC = TC_ADMIN_SGH_USER_PRE_NAME;
  lastNameTC = TC_ADMIN_SGH_USER_LAST_NAME;
  requiredFieldErrorTC = TC_GENERAL_REQUIRED_ERROR;
  pwToShortTC = TC_ADMIN_USER_DIALOG_PW_TO_SHORT;

  destroy$ = new Subject();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);


  preNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public translationService: TranslationService,
              private adminService: AdminService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AdminUserDialogComponent>) {
  }

  saveUser() {
    this.adminService.addNewUser(
      {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      },
      this.preNameFormControl.value,
      this.lastNameFormControl.value
    )
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.openSnackBar(this.translationService.get(TC_ADMIN_ADD_NEW_USER_ERROR));
          return err;
        })
      )
      .subscribe(
        _ => {
          this.dialogRef.close(true);
          this.openSnackBar(this.translationService.get(TC_ADMIN_ADD_NEW_USER_SUCCESS))
        }
      );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
