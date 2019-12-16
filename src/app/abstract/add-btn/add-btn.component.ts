import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractComponent} from "../abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatMenu, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css']
})
export class AddBtnComponent extends AbstractComponent {
  @Input() matMenu: MatMenu;
  @Input() moreIcon: boolean;

  @Output() clickListener = new EventEmitter();

  menuOpen: boolean;

  constructor(breakpointObserver: BreakpointObserver,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }
}
