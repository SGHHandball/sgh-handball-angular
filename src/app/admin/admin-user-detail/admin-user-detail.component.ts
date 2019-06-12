import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SghUser} from "../sgh-user";
import {TC_ADMIN, TranslationService} from "../../translation.service";

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.css']
})
export class AdminUserDetailComponent {
  @Input() sghUser: SghUser;
  @Output() toggleChangeListener = new EventEmitter();

  adminTC = TC_ADMIN;

  constructor(public translationService: TranslationService) {
  }

  changeAdminMode() {
    this.sghUser.admin = !this.sghUser.admin;
    this.toggleChangeListener.next();
  }

}
