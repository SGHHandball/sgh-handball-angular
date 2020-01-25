import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractService} from "../../../shared/abstract.service";
import {News} from "../../../model/news";

@Component({
  selector: 'app-news-edit-report-part',
  templateUrl: './news-edit-report-part.component.html',
  styleUrls: ['./news-edit-report-part.component.css']
})
export class NewsEditReportPartComponent implements OnInit {

  @Input() news: News;
  @Output() changedValueListener = new EventEmitter();

  constructor(
    public abstractService: AbstractService,) {
  }

  ngOnInit() {
  }

  changeHomeTeam(homeTeam: string) {
    this.news.homeTeam = homeTeam;
    this.changedValueListener.next()
  }


  changeEnemyTeam(enemyTeam: string) {
    this.news.enemyTeam = enemyTeam;
    this.changedValueListener.next()
  }


  changeScore(score: string) {
    this.news.score = score;
    this.changedValueListener.next()
  }

}
