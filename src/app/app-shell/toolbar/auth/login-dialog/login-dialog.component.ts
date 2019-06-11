import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  TC_BACK,
  TC_EMAIL, TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED,
  TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL,
  TC_LOGIN,
  TC_PASSWORD,
  TranslationService
} from "../../../../translation.service";

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
  passwordTC = TC_PASSWORD;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl();

  constructor(public translationService: TranslationService) {
  }

  getCredentials(): Credentials {
    return new Credentials(this.emailFormControl.value, this.passwordFormControl.value);
  }
}

export class Credentials {
  email: string;
  password: string;


  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
