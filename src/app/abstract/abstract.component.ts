import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

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

  constructor(public breakpointObserver: BreakpointObserver) {
    this.isHandset$.subscribe(handset => {
      this.dialogWidth = handset ? '90%' : '50%';
    });
  }
}
