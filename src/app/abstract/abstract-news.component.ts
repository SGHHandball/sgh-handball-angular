import {Component, OnDestroy} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractComponent} from "./abstract.component";
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
import {MatDialog, MatSnackBar} from "@angular/material";
import {environment} from "../../environments/environment";
import {News} from "../model/news";
import {NewsService} from "../news/news.service";
import {DefaultDialogComponent, DialogData} from "./default-dialog/default-dialog.component";
import {DataService} from "../common/data.service";
import {Subject} from "rxjs";
import {catchError, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-abstract-news',
  templateUrl: './abstract.component.html'
})
export abstract class AbstractNewsComponent extends AbstractComponent implements OnDestroy {

  destroy$ = new Subject();
  news: News[] = [];

  constructor(breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              public dialog: MatDialog,
              public dataService: DataService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }

  openDeleteNewsDialog(news: News) {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteNews(news)
          .pipe(takeUntil(this.destroy$),
            catchError(error => {
              if (!environment.production) console.log(error);
              this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
              return error;
            })
          )
          .subscribe(
            _ => {
              if (this.news.includes(news)) {
                this.news.splice(this.news.indexOf(news), 1);
              }
              this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS))
            }
          )
      }
    });
  }


  openSendNewsDialog(news: News) {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_NEWS_SEND_HEADER, TC_NEWS_SEND_MESSAGE)
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        news.send = true;
        this.dataService.updateNews(news)
          .pipe(takeUntil(this.destroy$),
            catchError(error => {
              if (!environment.production) console.log(error);
              this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
              return error;
            })
          )
          .subscribe(
            _ => {
              this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS))
            }
          )
      }
    });
  }

  openCheckNewsDialog(news: News) {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_NEWS_CHECKED_HEADER, TC_NEWS_CHECKED_MESSAGE)
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        news.checked = true;
        this.dataService.updateNews(news)
          .pipe(takeUntil(this.destroy$),
            catchError(error => {
              if (!environment.production) console.log(error);
              this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL));
              return error;
            })
          )
          .subscribe(
            _ => {
              this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS))
            }
          )
      }
    });
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
