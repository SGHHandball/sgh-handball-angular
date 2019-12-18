import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {News} from "../news";
import {AbstractComponent} from "../../abstract/abstract.component";
import {
  TC_NEWS_NO_NEWS, TranslationService
} from "../../translation.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.css']
})
export class NewsCardListComponent extends AbstractComponent  {
  @Input() news: News[];

  @Output() editClickListener = new EventEmitter<News>();
  @Output() deleteClickListener = new EventEmitter<News>();
  @Output() sendClickListener = new EventEmitter<News>();
  @Output() checkClickListener = new EventEmitter<News>();
  @Output() exportChangeListener = new EventEmitter<News>();
  @Output() openDetailClickListener = new EventEmitter<News>();

  noNewsTC = TC_NEWS_NO_NEWS;

  constructor(breakpointObserver: BreakpointObserver, snackBar: MatSnackBar, public translationService: TranslationService) {
    super(breakpointObserver, snackBar);
  }

}

