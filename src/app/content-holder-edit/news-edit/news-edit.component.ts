import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {News, NewsType,} from "../../model/news";
import {FormControl} from "@angular/forms";
import {
  TC_EDIT_NEWS,
  TC_GENERAL_DELETE_HEADER,
  TC_GENERAL_DELETE_MESSAGE,
  TC_NEWS_BODY,
  TC_NEWS_DATE,
  TC_NEWS_ENEMY_TEAM,
  TC_NEWS_HOME_TEAM,
  TC_NEWS_PLAYERS,
  TC_NEWS_SCORE,
  TC_NEWS_SEASON,
  TC_NEWS_SUMMARY,
  TC_NEWS_TEAM_AGE,
  TC_NEWS_TITLE,
  TC_NEWS_UNSAVED_DATA_WARNING,
  TC_NEWS_UNSAVED_DATA_WARNING_HEADER,
  TC_SAVE,
  TranslationService
} from "../../translation.service";
import {MatDialog} from "@angular/material/dialog";
import {NewsService} from "../../news/news.service";
import {ComponentCanDeactivate} from "../../guards/pending-changes.guard";
import {Observable, of, Subject} from "rxjs";
import {DefaultDialogComponent, DialogData} from "../../shared/default-dialog/default-dialog.component";
import {first, map, share, startWith, switchMap, takeUntil} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {SeasonService} from "../../admin/seasons/season.service";
import {DataService} from "../../data/data.service";
import {ActivatedRoute} from "@angular/router";
import {IImage} from "ng2-image-compress";
import {Season} from "../../model/season";
import {AbstractService} from "../../shared/abstract.service";
import {AdminService} from "../../admin/admin.service";
import {EDITOR_CONFIG} from "../rich-text-editor/editor-config";

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  news: News;

  destroy$ = new Subject();

  changedValues = false;
  valuesInit = false;

  date = new FormControl();

  titleFormControl = new FormControl();
  teamAgeFormControl = new FormControl();

  saveTC = this.translationService.get(TC_SAVE);
  editNewsTC = this.translationService.get(TC_EDIT_NEWS);

  newsTitleTC = this.translationService.get(TC_NEWS_TITLE);
  newsDateTC = this.translationService.get(TC_NEWS_DATE);
  newsTeamAgeTC = this.translationService.get(TC_NEWS_TEAM_AGE);

  config = EDITOR_CONFIG;

  uploadProgress: Observable<number>;

  filteredTeamAgesOptions: Observable<string[]>;


  admin$ = this.adminService.isUserAdmin().pipe(share());

  constructor(
    public translationService: TranslationService,
    private dialog: MatDialog,
    public newsService: NewsService,
    private route: ActivatedRoute,
    private dataService: DataService,
    public abstractService: AbstractService,
    private adminService: AdminService
  ) {
  }


  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.changedValues;
  }

  isNewsTypeReport(): boolean {
    return this.news && this.news.type === NewsType.NEWS_TYPE_REPORT;
  }

  isNewsTypeTeamEvent(): boolean {
    return this.news && this.news.type === NewsType.NEWS_TYPE_TEAM_EVENT;
  }


  closeNews() {
    if (this.changedValues) {
      this.openChangedValuesDialog();
    } else {
      this.newsService.closeExpandedNews();
    }
  }

  ngOnInit(): void {
    this.initNews();
  }

  initNews() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const newsId = params['newsId'];
          return this.dataService.getNewsById(newsId)
        })
      ).subscribe(news => {
      this.news = news;
      this.initFormControls();
    })
  }

  initFormControls() {
    this.date.setValue(new Date(this.news.eventDate));
    this.date.registerOnChange(this.getOnChangeFunction);
    if (this.news.title) this.titleFormControl.setValue(this.news.title);
    if (this.news.teamAge) this.teamAgeFormControl.setValue(this.news.teamAge);
    this.initTeamAgeFilter();
    this.valuesInit = true;
  }


  initTeamAgeFilter() {
    this.filteredTeamAgesOptions =
      this.teamAgeFormControl.valueChanges
        .pipe(
          startWith(''),
          switchMap(
            value =>
              this.newsService.getTeamAges()
                .pipe(
                  map(
                    ages =>
                      ages
                        .filter(
                          option =>
                            option && option.toLowerCase().indexOf(value) === 0
                        )
                  )
                )
          )
        );
  }

  getOnChangeFunction(): () => any {
    return () => {
      this.onChangeValue();
    }
  }

  onChangeValue() {
    if (this.valuesInit) {
      this.changedValues = true;
    }
  }

  saveNews() {
    this.news.eventDate = new Date(this.date.value.toString()).getTime();
    this.news.title = this.titleFormControl.value;
    this.news.teamAge = this.teamAgeFormControl.value;
    this.dataService
      .saveNewsToDataBase(this.news)
      .pipe(first())
      .subscribe(_ => {
        this.changedValues = false;
      });
  }

  getDate(dateAsNumber: number): Date {
    return new Date(dateAsNumber);
  }

  changeEditDate(date: Date) {
    this.news.date = date.getTime();
    this.onChangeValue();
  }


  openChangedValuesDialog() {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth => this.dialog.open(DefaultDialogComponent, {
            width: dialogWidth,
            data: new DialogData(TC_NEWS_UNSAVED_DATA_WARNING_HEADER, TC_NEWS_UNSAVED_DATA_WARNING)
          }
        ).afterClosed())
      ).subscribe(result => {
      if (result) {
        this.changedValues = false;
        this.closeNews()
      }
    });
  }


  upload(image: IImage) {
    this.uploadProgress = undefined;
    this.dataService.uploadImage(image, this.news.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          imageProgress => {
            if (imageProgress.uploadDone) {
              if (!environment.production) console.log(imageProgress);
              this.news.imgPaths.push(imageProgress.path);
              this.news.imgLinks.push(imageProgress.url);
              this.uploadProgress = of(imageProgress.progress);
            } else {
              this.uploadProgress = of(imageProgress.progress);
            }
            return of(imageProgress.uploadDone)
          }
        ),
        switchMap(
          doneUploading => {
            if (doneUploading) {
              this.uploadProgress = undefined;
              return this.dataService.updateNews(this.news);
            }
            return of(false)
          }
        )
      ).subscribe();
  }


  deleteImage(index: number) {
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth => this.dialog.open(DefaultDialogComponent, {
            width: dialogWidth,
            data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
          }
          ).afterClosed()
        ),
        switchMap(result => {
          if (result) {
            return this.dataService.deleteImage(this.news.imgPaths[index]);
          }
          return of("Cancel")
        }),
        switchMap(result => {
          if (!result) {
            this.news.imgLinks.splice(index, 1);
            this.news.imgPaths.splice(index, 1);
            return this.dataService.updateNews(this.news);
          }
          return of(undefined);
        })
      ).subscribe();
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}
