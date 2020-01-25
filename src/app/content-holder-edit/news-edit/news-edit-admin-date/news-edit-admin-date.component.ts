import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-news-edit-admin-date',
  templateUrl: './news-edit-admin-date.component.html',
  styleUrls: ['./news-edit-admin-date.component.css']
})
export class NewsEditAdminDateComponent implements OnInit {

  @Input() editDate: Date;
  @Output() changedValueListener = new EventEmitter<Date>();

  hours: string;
  minutes: string;

  editDateFormControl = new FormControl();

  constructor() {
  }

  ngOnInit() {
    this.editDateFormControl.setValue(this.editDate);
    this.editDateFormControl.registerOnChange(this.getOnChangeFunction);
    this.setupHoursAndMinutes();
  }

  setupHoursAndMinutes() {
    if (this.editDate) {
      this.hours = this.editDate.getHours().toString();
      this.minutes = this.editDate.getMinutes().toString();
    }
  }

  getOnChangeFunction(): () => any {
    return () => {
      this.changeDate();
    }
  }

  changeDate(){
    this.editDate = new Date(this.editDateFormControl.value);
    this.setupHoursAndMinutes();
    this.onChangeDate();
  }

  changeEditTimeHour(hour: number) {
    this.editDate.setHours(hour);
    this.editDateFormControl.setValue(this.editDate);
    this.setupHoursAndMinutes();
    this.onChangeDate();
  }

  changeEditTimeMinute(minutes: number) {
    this.editDate.setMinutes(minutes);
    this.editDateFormControl.setValue(this.editDate);
    this.setupHoursAndMinutes();
    this.onChangeDate();
  }

  onChangeDate(){
    this.changedValueListener.next(this.editDate);
  }

}
