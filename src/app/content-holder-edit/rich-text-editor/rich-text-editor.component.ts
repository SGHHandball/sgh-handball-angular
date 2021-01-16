import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Content} from "../../model/content";
import {EDITOR_CONFIG} from "./editor-config";
import {JoditAngularComponent} from "jodit-angular";

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {
  @ViewChild("editor") editor : JoditAngularComponent;

  @Input() htmlContent: Content;

  @Output() saveListener = new EventEmitter<string>();
  @Output() backListener = new EventEmitter();

  editContent: Content;

  config = EDITOR_CONFIG;

  ngOnInit(): void {
    this.editContent = {...this.htmlContent};
  }

  saveContent() {
    this.saveListener.next(this.editor.value);
  }

  cancel() {
    this.backListener.next();
  }
}
