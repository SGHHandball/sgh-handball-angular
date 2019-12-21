import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {NewsService} from "../../news/news.service";
import {Subject} from "rxjs";
import {AbstractService} from "../../abstract/abstract.service";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() sideNavButtonIcon: string = 'menu';
  @Output() sideNavButtonListener = new EventEmitter();

  destroy$ = new Subject();

  appName = environment.appName;
  appNameShort = environment.appNameShort;

  appNameVisible: boolean = true;

  constructor(public abstractService: AbstractService,
              private router: Router,
              public newsService: NewsService) {
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
