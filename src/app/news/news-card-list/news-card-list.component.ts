import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getDateString, getDateWithTeamAgeAsString, getTeamsWithScoreAsString, News} from "../news";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {AdminService} from "../../admin/admin.service";
import {
  TC_NEWS_NO_NEWS,
  TC_NEWS_PLAYERS,
  TC_NEWS_SUMMARY, TC_NEWS_TYPE_DESCRIPTION, TC_NEWS_TYPE_EVENT,
  TC_NEWS_TYPE_REPORT,
  TranslationService
} from "../../translation.service";
import {NEWS_TYPE_REPORT} from "../../abstract/abstract-news.service";

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.css']
})
export class NewsCardListComponent extends AbstractComponent {

  @Input() news: News[];


  @Output() editClickListener = new EventEmitter<News>();
  @Output() deleteClickListener = new EventEmitter<News>();
  @Output() sendClickListener = new EventEmitter<News>();
  @Output() checkClickListener = new EventEmitter<News>();

  noNewsTC = TC_NEWS_NO_NEWS;
  summaryTC = TC_NEWS_SUMMARY;
  playersTC = TC_NEWS_PLAYERS;


  constructor(breakpointObserver: BreakpointObserver, snackBar: MatSnackBar,
              public adminService: AdminService, public translationService: TranslationService) {
    super(breakpointObserver, snackBar);
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
      case NEWS_TYPE_REPORT:
        return this.translationService.get(TC_NEWS_TYPE_REPORT);
      default:
        return this.translationService.get(TC_NEWS_TYPE_DESCRIPTION);
    }
  }

}
