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
import {MatDialog} from "@angular/material";
import {NewsService} from "../news.service";
import {ComponentCanDeactivate} from "../../guards/pending-changes.guard";
import {Observable, of, Subject} from "rxjs";
import {DefaultDialogComponent, DialogData} from "../../shared/default-dialog/default-dialog.component";
import {map, startWith, switchMap, takeUntil} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {SeasonService} from "../../admin/seasons/season.service";
import {DataService} from "../../data/data.service";
import {ActivatedRoute} from "@angular/router";
import {IImage} from "ng2-image-compress";
import {Season} from "../../model/season";
import {AbstractService} from "../../shared/abstract.service";

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
  scoreFormControl = new FormControl();
  bodyFormControl = new FormControl();
  summaryFormControl = new FormControl();
  playersFormControl = new FormControl();
  teamAgeFormControl = new FormControl();
  teamSeasonFormControl = new FormControl();
  enemyTeamFormControl = new FormControl();
  homeTeamFormControl = new FormControl();

  saveTC = this.translationService.get(TC_SAVE);
  editNewsTC = this.translationService.get(TC_EDIT_NEWS);

  newsTitleTC = this.translationService.get(TC_NEWS_TITLE);
  newsScoreTC = this.translationService.get(TC_NEWS_SCORE);
  newsSummaryTC = this.translationService.get(TC_NEWS_SUMMARY);
  newsPlayersTC = this.translationService.get(TC_NEWS_PLAYERS);
  newsBodyTC = this.translationService.get(TC_NEWS_BODY);
  newsDateTC = this.translationService.get(TC_NEWS_DATE);
  newsTeamAgeTC = this.translationService.get(TC_NEWS_TEAM_AGE);
  newsTeamSeasonTC = this.translationService.get(TC_NEWS_SEASON);
  newsHomeTeam = this.translationService.get(TC_NEWS_HOME_TEAM);
  newsEnemyTeam = this.translationService.get(TC_NEWS_ENEMY_TEAM);

  uploadProgress: Observable<number>;

  filteredTeamAgesOptions: Observable<string[]>;

  currentSeason: Season;

  constructor(
    public translationService: TranslationService,
    private dialog: MatDialog,
    public newsService: NewsService,
    private seasonService: SeasonService,
    private route: ActivatedRoute,
    private dataService: DataService,
    public abstractService: AbstractService) {
  }


  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.changedValues;
  }

  isNewsTypeReport(): boolean {
    return this.news && this.news.type === NewsType.NEWS_TYPE_REPORT;
  }


  closeNews() {
    if (this.changedValues) {
      this.openChangedValuesDialog();
    } else {
      this.newsService.closeExpandedNews();
    }
  }

  ngOnInit(): void {
    this.initCurrentSeason();
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
        console.log(news);
      this.news = news;
      this.initFormControls();
    })
  }

  initCurrentSeason() {
    this.dataService.getCurrentSeason()
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentSeason => this.currentSeason = currentSeason)
  }

  initFormControls() {
    this.date.setValue(new Date(this.news.eventDate));
    this.date.registerOnChange(this.getOnChangeFunction);
    if (this.news.title) this.titleFormControl.setValue(this.news.title);
    if (this.news.score) this.scoreFormControl.setValue(this.news.score);
    if (this.news.body) this.bodyFormControl.setValue(this.news.body);
    if (this.news.summary) this.summaryFormControl.setValue(this.news.summary);
    if (this.news.players) this.playersFormControl.setValue(this.news.players);
    if (this.news.enemyTeam) this.enemyTeamFormControl.setValue(this.news.enemyTeam);
    if (this.news.homeTeam) this.homeTeamFormControl.setValue(this.news.homeTeam);
    if (this.news.teamAge) this.teamAgeFormControl.setValue(this.news.teamAge);
    if (this.news.teamSeason) this.teamSeasonFormControl.setValue(this.news.teamSeason);
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
    this.news.score = this.scoreFormControl.value;
    this.news.body = this.bodyFormControl.value;
    this.news.summary = this.summaryFormControl.value;
    this.news.players = this.playersFormControl.value;
    this.news.teamAge = this.teamAgeFormControl.value;
    this.news.enemyTeam = this.enemyTeamFormControl.value;
    this.news.homeTeam = this.homeTeamFormControl.value;
    this.news.teamSeason = this.teamSeasonFormControl.value;
    this.saveNewClub(this.enemyTeamFormControl.value);
    this.saveNewClub(this.homeTeamFormControl.value);
    this.dataService
      .saveNewsToDataBase(this.news)
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        this.changedValues = false;
      });
  }

  saveNewClub(club: string) {
    this.newsService.saveNewClubToCollection(club);
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
