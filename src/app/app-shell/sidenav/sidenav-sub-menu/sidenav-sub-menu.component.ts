import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationItem} from "../navigation-item";

@Component({
  selector: 'app-sidenav-sub-menu',
  templateUrl: './sidenav-sub-menu.component.html',
  styleUrls: ['./sidenav-sub-menu.component.css']
})
export class SidenavSubMenuComponent implements OnInit {

  @Input() header:string;

  @Input() navItems:NavigationItem[];

  @Output() closeEventEmitter = new EventEmitter();

  @Output() navigateEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
