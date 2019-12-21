import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  dialogWidth$: Observable<string> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      map(handset => handset ? '90%' : '50%')
    );

  constructor(public breakpointObserver: BreakpointObserver,
              public snackBar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }
}
