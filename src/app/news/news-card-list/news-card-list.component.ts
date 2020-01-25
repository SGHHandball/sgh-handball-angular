import {Component, EventEmitter, Input, Output} from '@angular/core';
import {News} from "../../model/news";
import {TC_NEWS_NO_NEWS, TranslationService} from "../../translation.service";
import {NewsService} from "../news.service";
import {SghUser} from "../../model/sgh-user";

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.css']
})
export class NewsCardListComponent {
  @Input() news: News[];
  @Input() user: SghUser;

  @Output() editClickListener = new EventEmitter<News>();
  @Output() deleteClickListener = new EventEmitter<News>();
  @Output() sendClickListener = new EventEmitter<News>();
  @Output() checkClickListener = new EventEmitter<News>();
  @Output() openDetailClickListener = new EventEmitter<News>();

  noNewsTC = TC_NEWS_NO_NEWS;

  constructor(
    public translationService: TranslationService,
    public newsService: NewsService) {
  }


}

