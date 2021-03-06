import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractService} from "../abstract.service";
import {MatMenu} from "@angular/material/menu";

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css']
})
export class AddBtnComponent{
  @Input() matMenu: MatMenu;
  @Input() moreIcon: boolean;

  @Output() clickListener = new EventEmitter();

  menuOpen: boolean;

  constructor(public abstractService:AbstractService) {
  }
}
