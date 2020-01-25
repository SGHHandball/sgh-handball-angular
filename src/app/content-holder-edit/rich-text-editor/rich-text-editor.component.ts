import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Content} from "../../model/content";
import {EDITOR_CONFIG} from "./editor-config";

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {

  @Input() htmlContent: Content;

  @Output() saveListener = new EventEmitter<string>();
  @Output() backListener = new EventEmitter();

  editContent: Content;

  config = EDITOR_CONFIG;

  ngOnInit(): void {
    this.editContent = {...this.htmlContent};
  }

  saveContent() {
    this.saveListener.next(this.editContent.contentText);
  }

  cancel() {
    this.backListener.next();
  }
}
