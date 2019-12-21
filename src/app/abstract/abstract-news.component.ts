import {Component, OnDestroy} from '@angular/core';
import {
  TC_NEWS_CHECKED_HEADER,
  TC_NEWS_CHECKED_MESSAGE,
  TC_GENERAL_DELETE_HEADER,
  TC_GENERAL_DELETE_MESSAGE,
  TC_NEWS_SEND_HEADER,
  TC_NEWS_SEND_MESSAGE,
  TranslationService,
  TC_GENERAL_DELETE_SUCCESS,
  TC_GENERAL_DELETE_FAIL,
  TC_GENERAL_EDIT_SUCCESS,
  TC_GENERAL_EDIT_FAIL,
} from "../translation.service";
import {MatDialog} from "@angular/material";
import {environment} from "../../environments/environment";
import {News} from "../model/news";
import {NewsService} from "../news/news.service";
import {DefaultDialogComponent, DialogData} from "./default-dialog/default-dialog.component";
import {DataService} from "../data/data.service";
import {of, Subject} from "rxjs";
import {catchError, switchMap, takeUntil} from "rxjs/operators";
import {AbstractService} from "./abstract.service";
import {AdminService} from "../admin/admin.service";
import {ActivatedRoute} from "@angular/router";
import {SeasonService} from "../seasons/season.service";

@Component({
  selector: 'app-abstract-news',
  template: ''
})
export abstract class AbstractNewsComponent implements OnDestroy {

  //TODO: Change this to an Service

  destroy$ = new Subject();
  news: News[] = [];

  constructor(
    public translationService: TranslationService,
    public dialog: MatDialog,
    public dataService: DataService,
    public abstractService: AbstractService,
    public adminService: AdminService,
    public newsService: NewsService,
    public route: ActivatedRoute,
    public seasonService: SeasonService) {
  }

  openDeleteNewsDialog(news: News) {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth =>
          this.dialog.open(DefaultDialogComponent, {
              width: dialogWidth,
              data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
            }
          ).afterClosed()
        ),
        switchMap(result => result ? this.dataService.deleteNews(news) : of("Cancel")),
        catchError(error => {
          if (!environment.production) console.log(error);
          this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          return error;
        })
      )
      .subscribe(
        result => {
          if (!result) {
            if (this.news.includes(news)) {
              this.news.splice(this.news.indexOf(news), 1);
            }
            this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS))
          }
        }
      );
  }


  openSendCheckNewsDialog(news: News, send: boolean) {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth =>
          this.dialog.open(DefaultDialogComponent, {
              width: dialogWidth,
              data: send ? new DialogData(TC_NEWS_SEND_HEADER, TC_NEWS_SEND_MESSAGE) : new DialogData(TC_NEWS_CHECKED_HEADER, TC_NEWS_CHECKED_MESSAGE)
            }
          ).afterClosed()
        ),
        switchMap(result => {
          if (result) {
            if (send) news.send = true;
            else news.checked = true;
            return this.dataService.updateNews(news);
          }
          return of("Cancel")
        }),
        catchError(error => {
          if (!environment.production) console.log(error);
          this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
          return error;
        })
      )
      .subscribe(
        result => {
          if (!result) {
            this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS))
          }
        }
      );
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
