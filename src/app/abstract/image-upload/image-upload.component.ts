import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @Input() uploadProgress: Observable<number>;

  @Output() uploadEventListener = new EventEmitter<Event>();

  openFileUpload() {
    document.getElementById('fileUpload').click()
  }

}
