import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AbstractComponent} from "../../abstract/abstract.component";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent extends AbstractComponent {
  @Input() sideNavButtonIcon: string = 'menu';
  @Output() sideNavButtonListener = new EventEmitter();

  appName = environment.appName;
  appNameShort = environment.appNameShort;


}
