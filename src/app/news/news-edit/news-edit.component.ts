import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  DB_COLLECTION_NEWS,
  getDateString,
  getDateWithTeamAgeAsString,
  getTeamsWithScoreAsString,
  News,
  NEWS_TEAM_YOUTH_AGES
} from "../news";
import {FormControl} from "@angular/forms";
import {AbstractComponent} from "../../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {
  TC_BACK,
  TC_CANCEL,
  TC_EDIT_NEWS,
  TC_NEWS_BODY,
  TC_NEWS_DATE,
  TC_NEWS_ENEMY_TEAM,
  TC_NEWS_GENDER,
  TC_NEWS_GENDER_M,
  TC_NEWS_GENDER_W,
  TC_NEWS_HOME_TEAM,
  TC_NEWS_SCORE,
  TC_NEWS_SUMMARY,
  TC_NEWS_TEAM_AGE,
  TC_NEWS_TEAM_MEN,
  TC_NEWS_TEAM_WOMEN,
  TC_NEWS_TEAM_YOUTH,
  TC_NEWS_TITLE, TC_NEWS_UNSAVED_DATA_WARNING, TC_NEWS_UNSAVED_DATA_WARNING_HEADER,
  TC_OK,
  TC_SAVE,
  TranslationService
} from "../../translation.service";
import {MatDatepickerInputEvent, MatDialog, MatInput, MatPaginator} from "@angular/material";
import {AngularFirestore} from "@angular/fire/firestore";
import {NewsService} from "../news.service";
import {ComponentCanDeactivate} from "../../guards/pending-changes.guard";
import {Observable} from "rxjs";
import {DefaultDialogComponent, DialogData} from "../../abstract/default-dialog/default-dialog.component";

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent extends AbstractComponent implements OnInit, ComponentCanDeactivate {

  @ViewChild('title', {static: true}) title: ElementRef;
  @ViewChild('score', {static: true}) score: ElementRef;
  @ViewChild('body', {static: true}) body: ElementRef;
  @ViewChild('summary', {static: true}) summary: ElementRef;
  @ViewChild('teamAge', {static: true}) teamAge: ElementRef;
  @ViewChild('enemyTeam', {static: true}) enemyTeam: ElementRef;
  @ViewChild('homeTeam', {static: true}) homeTeam: ElementRef;

  news: News;
  editable = false;

  changedValues = false;

  date = new FormControl();

  saveTC = this.translationService.get(TC_SAVE);
  backTC = this.translationService.get(TC_BACK);
  editNewsTC = this.translationService.get(TC_EDIT_NEWS);
  newsTitleTC = this.translationService.get(TC_NEWS_TITLE);
  newsScoreTC = this.translationService.get(TC_NEWS_SCORE);
  newsSummaryTC = this.translationService.get(TC_NEWS_SUMMARY);
  newsBodyTC = this.translationService.get(TC_NEWS_BODY);
  newsDateTC = this.translationService.get(TC_NEWS_DATE);
  newsTeamAgeTC = this.translationService.get(TC_NEWS_TEAM_AGE);
  newsHomeTeam = this.translationService.get(TC_NEWS_HOME_TEAM);
  newsEnemyTeam = this.translationService.get(TC_NEWS_ENEMY_TEAM);

  newsTeamAges = [];

  constructor(breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              private dialog: MatDialog,
              public newsService: NewsService) {
    super(breakpointObserver);
    this.addTeamAges();
  }


  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.changedValues;
  }

  addTeamAges() {
    this.newsTeamAges.push(this.translationService.get(TC_NEWS_TEAM_MEN));
    this.newsTeamAges.push(this.translationService.get(TC_NEWS_TEAM_WOMEN));
    const youthTC = this.translationService.get(TC_NEWS_TEAM_YOUTH);
    const genderWoman = this.translationService.get(TC_NEWS_GENDER_W);
    const genderMen = this.translationService.get(TC_NEWS_GENDER_M);
    NEWS_TEAM_YOUTH_AGES.forEach(age => {
      this.newsTeamAges.push(genderMen + ' ' + age + youthTC);
      this.newsTeamAges.push(genderWoman + ' ' + age + youthTC);
    })
  }

  closeNews() {
    if (this.changedValues) {
      this.openChangedValuesDialog();
    } else {
      this.newsService.closeExpandedNews();
    }
  }

  ngOnInit(): void {
    if (this.newsService.expandedNews) {
      this.news = this.newsService.expandedNews;
      this.date.setValue(this.newsService.expandedNews.date.toLocaleString());
      this.date.registerOnChange(this.getOnChangeFunction);
      this.editable = this.newsService.expandedNewsEdit;
    } else {
      this.newsService.closeExpandedNews();
    }
  }

  getOnChangeFunction(): () => any {
    return () => {
      this.onChangeValue();
    }
  }

  onChangeValue() {
    if (!this.changedValues) {
      this.changedValues = true;
    }
  }

  getDateWithTeamAgeAsString(): string {
    return getDateWithTeamAgeAsString(this.news);
  }

  getTeamsWithScoreAsString(): string {
    return getTeamsWithScoreAsString(this.news);
  }

  saveNews() {
    this.news.date = this.date.value.toString();
    this.news.title = this.title.nativeElement.value;
    this.news.score = this.score.nativeElement.value;
    this.news.body = this.body.nativeElement.value;
    this.news.summary = this.summary.nativeElement.value;
    this.news.teamAge = this.teamAge.nativeElement.value;
    this.news.enemyTeam = this.enemyTeam.nativeElement.value;
    this.news.homeTeam = this.homeTeam.nativeElement.value;
    this.saveNewClub(this.enemyTeam.nativeElement.value);
    this.saveNewClub(this.homeTeam.nativeElement.value);
    this.newsService.saveNewsToDataBase(this.news, () => {
      this.changedValues = false;
    });
  }

  saveNewClub(club: string) {
    this.newsService.saveNewClubToCollection(club);
  }


  openChangedValuesDialog() {
    const dialogRef = this.dialog.open(DefaultDialogComponent, {
        width: this.dialogWidth,
        data: new DialogData(TC_NEWS_UNSAVED_DATA_WARNING_HEADER, TC_NEWS_UNSAVED_DATA_WARNING)
      }
    );

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
