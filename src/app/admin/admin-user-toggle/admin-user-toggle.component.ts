import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-user-toggle',
  templateUrl: './admin-user-toggle.component.html',
  styleUrls: ['./admin-user-toggle.component.css']
})
export class AdminUserToggleComponent {

  @Input() toggleDesc: string;
  @Input() toggleValue: boolean;
  @Output() toggleChangeListener = new EventEmitter();

}
