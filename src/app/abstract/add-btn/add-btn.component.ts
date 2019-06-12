import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractComponent} from "../abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TeamsService} from "../../teams/teams.service";
import {AdminService} from "../../admin/admin.service";
import {MatMenu} from "@angular/material";

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css']
})
export class AddBtnComponent extends AbstractComponent {
  @Input() matMenu: MatMenu;
  @Input() moreIcon: boolean;

  @Output() clickListener = new EventEmitter();

  menuOpen: boolean;

  constructor(breakpointObserver: BreakpointObserver,
              public adminService: AdminService) {
    super(breakpointObserver);
  }
}
