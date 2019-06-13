import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html'
})
export class AbstractComponent {

  dialogWidth = '50%';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public breakpointObserver: BreakpointObserver,
              public snackBar: MatSnackBar) {
    this.isHandset$.subscribe(handset => {
      this.dialogWidth = handset ? '90%' : '50%';
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }
}
