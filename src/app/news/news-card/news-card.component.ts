import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getDateString, getTeamsWithScoreAsString, News, NewsType} from "../../model/news";
import {
  TC_NEWS_EXPORT_CHECK_BOX,
  TranslationService
} from "../../translation.service";
import {Observable, of, Subject} from "rxjs";
import {share, switchMap, takeUntil} from "rxjs/operators";
import {DataService} from "../../data/data.service";
import {AdminService} from "../../admin/admin.service";
import {AbstractService} from "../../shared/abstract.service";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input() newsCard: News;

  @Output() editClickListener = new EventEmitter();
  @Output() deleteClickListener = new EventEmitter();
  @Output() sendClickListener = new EventEmitter();
  @Output() checkClickListener = new EventEmitter();
  @Output() openDetailClickListener = new EventEmitter();

  exportCheckBoxTC = TC_NEWS_EXPORT_CHECK_BOX;

  destroy$ = new Subject();

  editMenuVisible = false;
  newsStateVisible = false;
  exportVisible = false;
  rightsToEdit = false;

  exportRight$ = this.adminService.isUserEventAdmin().pipe(share());

  constructor(
    public translationService: TranslationService,
    private dataService: DataService,
    private adminService: AdminService,
    public abstractService: AbstractService
  ) {
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

  getDateAsString(news: News): string {
    return getDateString(news.eventDate);
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
                    return of((user && user.uid === news.creator) || rightsForTeam);
                  }
                )
              );
          }
        )
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

  getText(news: News): string {
    return news.summary ?
      this.getFirstCharacters(news.summary, 200) :
      news.body ?
        this.getFirstCharacters(news.body, 200) :
        '';
  }

  getFirstCharacters(string: string, maxChars: number): string {
    if (string.length > maxChars) {
      return [string.substring(0, maxChars), "..."].join(" ");
    }
    return string;
  }
}
