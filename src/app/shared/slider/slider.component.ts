import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SliderImage} from "../../model/slider-image";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SliderService} from "./slider.service";

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

  constructor(public sliderService: SliderService) {

  }

  ngOnInit(): void {
    if (this.autoPlay) this.initAutoPlay();
    this.sliderService.currentIndex = 0;
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
      if (this.sliderArray.length - 1 == this.sliderService.currentIndex) {
        this.sliderService.currentIndex = 0;
      } else {
        this.sliderService.currentIndex++;
      }
    }
  }

  decreaseIndex() {
    if (this.sliderArray) {
      if (0 == this.sliderService.currentIndex) {
        this.sliderService.currentIndex = this.sliderArray.length - 1;
      } else {
        this.sliderService.currentIndex--;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }


}
