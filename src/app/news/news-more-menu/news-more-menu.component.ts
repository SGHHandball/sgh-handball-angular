import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-news-more-menu',
  templateUrl: './news-more-menu.component.html',
  styleUrls: ['./news-more-menu.component.css']
})
export class NewsMoreMenuComponent {
  @Output() editClickListener = new EventEmitter();
  @Output() deleteClickListener = new EventEmitter();
  @Output() sendClickListener = new EventEmitter();
}
