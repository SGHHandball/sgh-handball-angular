import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractService} from "../shared/abstract.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  fullSize: boolean;

  constructor(
    public abstractService: AbstractService,
  ) {
  }

  ngOnInit(): void {
    this.abstractService.isHandset$
      .pipe(takeUntil(this.destroy$))
      .subscribe( handset=>{
        this.fullSize = handset;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

}
