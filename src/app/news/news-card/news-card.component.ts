import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getDateString, getDateWithTeamAgeAsString, getTeamsWithScoreAsString, News, NewsType} from "../news";
import {
  TC_NEWS_EXPORT_CHECK_BOX,
  TC_NEWS_PLAYERS,
  TC_NEWS_SUMMARY,
  TC_NEWS_TYPE_DESCRIPTION,
  TC_NEWS_TYPE_REPORT,
  TranslationService
} from "../../translation.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {AbstractComponent} from "../../abstract/abstract.component";
import {Observable, of, Subject} from "rxjs";
import {map, share, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../../common/data.service";
import {AdminService} from "../../admin/admin.service";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent extends AbstractComponent implements OnInit {

  @Input() newsCard: News;

  @Output() editClickListener = new EventEmitter();
  @Output() deleteClickListener = new EventEmitter();
  @Output() sendClickListener = new EventEmitter();
  @Output() checkClickListener = new EventEmitter();
  @Output() exportChangeListener = new EventEmitter<boolean>();

  summaryTC = TC_NEWS_SUMMARY;
  playersTC = TC_NEWS_PLAYERS;
  exportCheckBoxTC = TC_NEWS_EXPORT_CHECK_BOX;

  destroy$ = new Subject();

  editMenuVisible = false;
  newsStateVisible = false;
  exportVisible = false;
  rightsToEdit = false;

  exportRight$ = this.adminService.isUserEventAdmin().pipe(share());

  constructor(breakpointObserver: BreakpointObserver,
              snackBar: MatSnackBar,
              public translationService: TranslationService,
              private dataService: DataService,
              private adminService: AdminService
  ) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit(): void {
    this.initRightsToEdit()
  }

  initRightsToEdit() {
    this.hasRightsToEdit(this.newsCard)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        editRights => {
          this.exportVisible = editRights && this.newsCard.type === NewsType.NEWS_TYPE_REPORT;
          this.editMenuVisible = editRights;
          this.newsStateVisible = editRights;
          this.rightsToEdit = editRights;
        }
      )
  }

  getDateWithTeamAgeAsString(news: News): string {
    return getDateWithTeamAgeAsString(news);
  }

  getDateAsString(news: News): string {
    return getDateString(news.date);
  }

  getTeamsWithScoreAsString(news: News): string {
    return getTeamsWithScoreAsString(news);
  }


  isNewsCardReport(): boolean {
    return this.newsCard.type === NewsType.NEWS_TYPE_REPORT;
  }

  hasRightsToEdit(news: News): Observable<boolean> {
    return this.dataService.getUser()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(user => {
          return this.dataService
            .hasUserRightsForTeam(news.teamAge, news.teamSeason)
            .pipe(
              switchMap(
                rightsForTeam => {
                  return of(user && user.uid === news.creator || rightsForTeam);
                }
              )
            );
        })
      );

  }

  getNewsStateIcon(news: News): string {
    if (!this.rightsToEdit) return '';
    if (news.send && !news.checked) {
      return 'done';
    } else if (news.checked) {
      return 'done_all';
    } else {
      return 'new_releases';
    }
  }

  getBodyHeaderOfType(type: string): string {
    switch (type) {
      case NewsType.NEWS_TYPE_REPORT:
        return this.translationService.get(TC_NEWS_TYPE_REPORT);
      default:
        return this.translationService.get(TC_NEWS_TYPE_DESCRIPTION);
    }
  }
}
