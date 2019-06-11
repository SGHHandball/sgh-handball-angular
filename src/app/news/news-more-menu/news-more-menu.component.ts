import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../admin/admin.service";

@Component({
  selector: 'app-news-more-menu',
  templateUrl: './news-more-menu.component.html',
  styleUrls: ['./news-more-menu.component.css']
})
export class NewsMoreMenuComponent {

  constructor(public adminService: AdminService) {

  }

  @Input() sendInvisible: boolean;
  @Input() checkedInvisible: boolean;
  @Output() editClickListener = new EventEmitter();
  @Output() deleteClickListener = new EventEmitter();
  @Output() sendClickListener = new EventEmitter();
  @Output() checkClickListener = new EventEmitter();
}
