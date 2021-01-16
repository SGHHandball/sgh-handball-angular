import { Component } from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cookie-disclaimer',
  templateUrl: './cookie-disclaimer.component.html',
  styleUrls: ['./cookie-disclaimer.component.css']
})
export class CookieDisclaimerComponent{

  constructor(public dialogRef: MatSnackBarRef<CookieDisclaimerComponent>,){}
}
