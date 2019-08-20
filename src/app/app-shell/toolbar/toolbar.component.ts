import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {TranslationService} from "../../translation.service";
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent extends AbstractComponent {
  @Input() sideNavButtonIcon: string = 'menu';
  @Output() sideNavButtonListener = new EventEmitter();

  appName = environment.appName;
  appNameShort = environment.appNameShort;

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              snackBar: MatSnackBar) {
    super(breakpointObserver,snackBar);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
