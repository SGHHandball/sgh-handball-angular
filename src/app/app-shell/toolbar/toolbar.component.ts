import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {FormControl} from "@angular/forms";
import {NewsService} from "../../news/news.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent extends AbstractComponent implements OnInit, OnDestroy {
  @Input() sideNavButtonIcon: string = 'menu';
  @Output() sideNavButtonListener = new EventEmitter();

  destroy$ = new Subject();

  appName = environment.appName;
  appNameShort = environment.appNameShort;

  appNameVisible: boolean = true;

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              public newsService: NewsService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit(): void {
  }


  goToHome() {
    this.router.navigate(['/']);
  }

  changeVisibilityAppName(closed: boolean) {
    this.appNameVisible = closed;
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}
