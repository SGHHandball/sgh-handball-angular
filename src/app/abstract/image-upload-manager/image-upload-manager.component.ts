import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TC_IMAGES, TranslationService} from "../../translation.service";
import {Observable} from "rxjs";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-image-upload-manager',
  templateUrl: './image-upload-manager.component.html',
  styleUrls: ['./image-upload-manager.component.css']
})
export class ImageUploadManagerComponent {


  @Input() uploadProgress: Observable<number>;
  @Output() uploadEventListener = new EventEmitter<Event>();
  @Output() afterItemMovedEventListener = new EventEmitter();
  @Output() itemDeleteEventListener = new EventEmitter<number>();

  @Input() urls: string[] = [];

  imagesTC = this.translationService.get(TC_IMAGES);

  constructor(public translationService: TranslationService) {
  }

  moveImage(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.afterItemMovedEventListener.next();
  }
}
