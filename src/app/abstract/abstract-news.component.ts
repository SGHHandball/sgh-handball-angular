import {Component} from '@angular/core';
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
import {News} from "../news/news";
import {NewsService} from "../news/news.service";
import {DefaultDialogComponent, DialogData} from "./default-dialog/default-dialog.component";

@Component({
  selector: 'app-abstract-news',
  templateUrl: './abstract.component.html'
})
export abstract class AbstractNewsComponent extends AbstractComponent {

  constructor(breakpointObserver: BreakpointObserver,
                        public newsService: NewsService,
                        public translationService: TranslationService,
                        public dialog: MatDialog,
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
        this.newsService.deleteNews(news).then(() => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS))
        }).catch(error => {
          if (!environment.production) console.log(error);
          this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL))
        });
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
        this.newsService.updateNewsSendToTrue(news).then(() => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS))
        }).catch(error => {
          if (!environment.production) console.log(error);
          this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL))
        });
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
        this.newsService.updateNewsCheckToTrue(news).then(() => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_SUCCESS))
        }).catch(error => {
          if (!environment.production) console.log(error);
          this.openSnackBar(this.translationService.get(TC_GENERAL_EDIT_FAIL))
        });
      }
    });
  }

}
