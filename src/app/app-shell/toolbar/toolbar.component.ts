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

  searchControl = new FormControl();

  constructor(public breakpointObserver: BreakpointObserver,
              private router: Router,
              private newsService: NewsService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit(): void {
    this.initSearchControl();
  }

  initSearchControl() {
    this.newsService.filterChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value !== this.searchControl.value) {
          this.searchControl.setValue(value);
        }
      });
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.newsService.filterChange$.next(value);
        this.newsService.filter = value;
      });
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
