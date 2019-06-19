import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../admin/admin.service";
import {TC_DELETE, TC_EDIT, TC_MAKE_VISIBLE, TC_SEND, TranslationService} from "../../translation.service";

@Component({
  selector: 'app-news-more-menu',
  templateUrl: './news-more-menu.component.html',
  styleUrls: ['./news-more-menu.component.css']
})
export class NewsMoreMenuComponent {

  editTC = TC_EDIT;
  deleteTC = TC_DELETE;
  sendTC = TC_SEND;
  makeVisibleTC = TC_MAKE_VISIBLE;

  constructor(public adminService: AdminService, public translationService: TranslationService) {
  }

  @Input() sendInvisible: boolean;
  @Input() checkedInvisible: boolean;
  @Output() editClickListener = new EventEmitter();
  @Output() deleteClickListener = new EventEmitter();
  @Output() sendClickListener = new EventEmitter();
  @Output() checkClickListener = new EventEmitter();
}
