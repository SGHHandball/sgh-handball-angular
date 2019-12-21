import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  TC_BACK,
  TC_EMAIL, TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED,
  TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL, TC_IMPRINT_LOGIN_DIALOG_ERROR_PASSWORD_REQUIRED,
  TC_LOGIN, TC_PASSWORD,
  TranslationService
} from "../../../translation.service";
import {Credentials} from "../../../model/Credentials";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

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

  constructor(public translationService: TranslationService) {
  }

  getCredentials(): Credentials {
    return {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    };
  }
}
