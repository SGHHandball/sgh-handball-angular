import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Content} from "../../model/content";

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

  config = {
    spellcheck: false,
    editable: true,
    height: "auto",
    minHeight: "0",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "",
    imageEndPoint: "",
    toolbar: [
      ["bold", "italic", "underline"],
      ["fontSize"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["link"]
    ]
  };

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
