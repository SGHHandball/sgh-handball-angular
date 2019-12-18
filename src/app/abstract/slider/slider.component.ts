import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SliderImage} from "../../model/slider-image";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Input() sliderArray: SliderImage[];
  @Input() autoPlayTime = 5000;
  @Input() autoPlay = true;
  @Input() objectFit = 'contain';
  @Input() height: string;
  @Input() width = '100%';
  @Input() imageBorderRadius: string;

  @Output() onSlideClickListener = new EventEmitter<string>();

  currentIndex = 0;

  ngOnInit(): void {
    if (this.autoPlay) this.initAutoPlay();
  }

  initAutoPlay() {
    interval(this.autoPlayTime)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        _ => {
          this.increaseIndex();
        }
      )
  }

  increaseIndex() {
    if (this.sliderArray) {
      if (this.sliderArray.length - 1 == this.currentIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }
  }

  decreaseIndex() {
    if (this.sliderArray) {
      if (0 == this.currentIndex) {
        this.currentIndex = this.sliderArray.length - 1;
      } else {
        this.currentIndex--;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }


}
