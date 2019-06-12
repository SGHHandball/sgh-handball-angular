import {AfterContentInit, Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractComponent} from "../abstract/abstract.component";
import {getDateString, getDateWithTeamAgeAsString, getTeamsWithScoreAsString, News} from "./news";
import {
  TC_NEWS_CHECKED_HEADER,
  TC_NEWS_CHECKED_MESSAGE,
  TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE,
  TC_NEWS_HEADER, TC_NEWS_SEND_HEADER, TC_NEWS_SEND_MESSAGE,
  TC_NEWS_TYPE_REPORT,
  TranslationService, TC_GENERAL_DELETE_SUCCESS, TC_GENERAL_DELETE_FAIL, TC_GENERAL_EDIT_SUCCESS, TC_GENERAL_EDIT_FAIL
} from "../translation.service";
import {NewsService, NewsType} from "./news.service";
import {AdminService} from "../admin/admin.service";
import {DefaultDialogComponent, DialogData} from "../abstract/default-dialog/default-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends AbstractComponent {

  newsHeaderTC = TC_NEWS_HEADER;
  newsTypeReportTC = TC_NEWS_TYPE_REPORT;

  newsTypeReport = NewsType.report;

  constructor(breakpointObserver: BreakpointObserver,
              public newsService: NewsService,
              public translationService: TranslationService,
              public adminService: AdminService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    super(breakpointObserver);
  }


  getDateWithTeamAgeAsString(news: News): string {
    return getDateWithTeamAgeAsString(news);
  }

  getTeamsWithScoreAsString(news: News): string {
    return getTeamsWithScoreAsString(news);
  }

  isEditMenuVisible(news: News): boolean {
    return this.hasRightsToEdit(news);
  }

  isNewsStateVisible(news: News): boolean {
    return this.hasRightsToEdit(news);
  }

  hasRightsToEdit(news: News): boolean {
    return this.adminService.user && this.adminService.user.uid === news.creator ||
      this.adminService.isUserAdmin()
      // TODO: Check for same Team
      ;
  }

  getNewsStateIcon(news: News): string {
    if (this.hasRightsToEdit(news))
      if (news.send && !news.checked) {
        return 'done';
      } else if (news.checked) {
        return 'done_all';
      } else {
        return 'new_releases';
      }
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

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

}
