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
import {AdminService} from "../../admin/admin.service";
import {AbstractComponent} from "../../abstract/abstract.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {DataService} from "../../common/data.service";

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

  uploadImages: string[] = [];

  constructor(breakpointObserver: BreakpointObserver,
              snackBar: MatSnackBar,
              public adminService: AdminService,
              public translationService: TranslationService,
              private dataService: DataService
  ) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit(): void {
    this.initUploadedImages();
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

  isEditMenuVisible(news: News): boolean {
    return this.hasRightsToEdit(news);
  }

  isNewsStateVisible(news: News): boolean {
    return this.hasRightsToEdit(news);
  }

  isExportVisible(news: News): boolean {
    return this.hasRightsToEdit(news) && this.newsCard.type === NewsType.NEWS_TYPE_REPORT;
  }


  hasRightsToEdit(news: News): boolean {
    return (this.adminService.user && this.adminService.user.uid === news.creator ||
      this.adminService.isUserAdmin() || this.adminService.hasUserRightsForTeam(news.teamAge, news.teamSeason));
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

  getBodyHeaderOfType(type: string): string {
    switch (type) {
      case NewsType.NEWS_TYPE_REPORT:
        return this.translationService.get(TC_NEWS_TYPE_REPORT);
      default:
        return this.translationService.get(TC_NEWS_TYPE_DESCRIPTION);
    }
  }

  initUploadedImages() {
    this.dataService.downloadImages(this.newsCard.imgLinks)
      .pipe(takeUntil(this.destroy$))
      .subscribe(link => {
        this.uploadImages.push(link);
      })
  }
}
