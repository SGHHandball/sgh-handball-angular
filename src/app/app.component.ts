import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {CookieDisclaimerComponent} from "./cookie-disclaimer/cookie-disclaimer.component";
import {CookieService} from "ngx-cookie-service";
import {COOKIE_DISCLAIMER} from "./constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sg-hainhausen-web';

  constructor(private _snackBar: MatSnackBar,
              private cookieService: CookieService) {
  }

  openSnackBar() {
    this._snackBar.openFromComponent(CookieDisclaimerComponent, {
      duration: 10000,
    });
  }

  ngOnInit(): void {
    this.initCookieDisclaimer()
  }


  initCookieDisclaimer() {
    if (!this.cookieService.get(COOKIE_DISCLAIMER)) {
      this.openSnackBar();
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      this.cookieService.set(COOKIE_DISCLAIMER, "true", currentDate);
    }
  }
}
