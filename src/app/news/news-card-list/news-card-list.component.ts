import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getDateWithTeamAgeAsString, getTeamsWithScoreAsString, News} from "../news";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";
import {AdminService} from "../../admin/admin.service";
import {TC_NEWS_NO_NEWS, TC_NEWS_SUMMARY, TC_NEWS_TYPE_REPORT, TranslationService} from "../../translation.service";

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.css']
})
export class NewsCardListComponent extends AbstractComponent implements OnInit {

  @Input() news: News[];


  @Output() editClickListener = new EventEmitter<News>();
  @Output() deleteClickListener = new EventEmitter<News>();
  @Output() sendClickListener = new EventEmitter<News>();
  @Output() checkClickListener = new EventEmitter<News>();

  noNewsTC = TC_NEWS_NO_NEWS;
  summaryTC = TC_NEWS_SUMMARY;


  constructor(breakpointObserver: BreakpointObserver, snackBar: MatSnackBar,
              public adminService: AdminService, public translationService: TranslationService) {
    super(breakpointObserver, snackBar);
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
    // TODO: Check for same Team
    return (this.adminService.user && this.adminService.user.uid === news.creator ||
      this.adminService.isUserAdmin());
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
      default:
        return this.translationService.get(TC_NEWS_TYPE_REPORT);
    }
  }

  ngOnInit() {
  }

}
