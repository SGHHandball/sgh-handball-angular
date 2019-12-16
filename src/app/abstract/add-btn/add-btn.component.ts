import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractComponent} from "../abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AdminService} from "../../admin/admin.service";
import {MatMenu, MatSnackBar} from "@angular/material";

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
              public adminService: AdminService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }
}
