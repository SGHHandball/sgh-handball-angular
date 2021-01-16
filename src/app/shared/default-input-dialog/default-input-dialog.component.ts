import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-default-input-dialog',
  templateUrl: './default-input-dialog.component.html',
  styleUrls: ['./default-input-dialog.component.css']
})
export class DefaultInputDialogComponent implements OnInit {


  inputFormControl = new FormControl('',
    [
      Validators.required
    ]
  );
  filteredOptions: Observable<string[]>;

  constructor(public dialogRef: MatDialogRef<DefaultInputDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DefaultInputDialogData) {
  }

  onOkClick() {
    this.dialogRef.close(this.inputFormControl.value)
  }


  ngOnInit() {
    this.filteredOptions = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.data.autocompleteValues.filter(option => option.toLowerCase().includes(filterValue));
  }

}

export class DefaultInputDialogData {

  header: string;
  inputPlaceholder: string;
  inputMissingError: string;
  cancel: string;
  ok: string;

  autocompleteValues: string[] = [];


  constructor(header: string, inputPlaceholder: string, inputMissingError: string, cancel: string, ok: string) {
    this.header = header;
    this.inputPlaceholder = inputPlaceholder;
    this.inputMissingError = inputMissingError;
    this.cancel = cancel;
    this.ok = ok;
  }

  withAutocompleteValues(autocompleteValues: string[]): DefaultInputDialogData {
    this.autocompleteValues = autocompleteValues;
    return this;
  }


}
