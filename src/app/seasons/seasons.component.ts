import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data/data.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  addNewCurrentYear() {
    this.dataService
      .changeCurrentSeason(
        {
          beginningYear: 2019,
          endingYear: 2020
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
