import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {from, Observable, Subject} from "rxjs";
import {IImage, ImageCompressService} from "ng2-image-compress";
import {catchError, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnDestroy {

  @Input() uploadProgress: Observable<number>;

  @Output() uploadEventListener = new EventEmitter<IImage>();

  openFileUpload() {
    document.getElementById('fileUpload').click()
  }

  destroy$ = new Subject();

  onChange(fileInput: any) {
    from(
      ImageCompressService.filesToCompressedImageSource(fileInput.target.files)
    )
      .pipe(
        takeUntil(this.destroy$),
        switchMap(imagesObservables => imagesObservables.pipe()),
        catchError(err => {
          this.uploadEventListener.next(undefined);
          console.error(err);
          return err;
        })
      )
      .subscribe(
        (image: IImage) => {
          if (image.compressedImage) {
            this.uploadEventListener.next(image.compressedImage)
          } else
            this.uploadEventListener.next(image)
        }
      );
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
