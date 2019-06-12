import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.css']
})
export class NewsFilterComponent {

  @Input() placeholder: string;
  @Input() possibleValues: string[] = [];
  @Output() onValueChangeListener = new EventEmitter<string[]>();

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filterCtrl = new FormControl();
  filteredValues: Observable<string[]>;

  values: string[] = [];

  @ViewChild('valueInput', {static: false}) valueInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredValues = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.possibleValues.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.values.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.filterCtrl.setValue(null);
      this.onValueChangeListener.next(this.values);
    }
  }

  remove(fruit: string): void {
    const index = this.values.indexOf(fruit);

    if (index >= 0) {
      this.values.splice(index, 1);
    }

    this.onValueChangeListener.next(this.values);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.values.push(event.option.viewValue);
    this.valueInput.nativeElement.value = '';
    this.filterCtrl.setValue(null);

    this.onValueChangeListener.next(this.values);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.possibleValues.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}
