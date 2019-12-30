import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../../data/data.service";
import {Training} from "../../../model/training";
import {Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {TeamService} from "../../team.service";

@Component({
  selector: 'app-contact',
  templateUrl: './team-information.component.html',
  styleUrls: ['./team-information.component.css']
})
export class TeamInformation implements OnInit, OnDestroy {

  destroy$ = new Subject();

  @Input() teamId: string;

  contactVisible = true;
  nuTableVisible = false;
  nuGamesVisible = false;

  trainings: Training[];

  constructor(
    private dataService: DataService,
    private teamService: TeamService
  ) {
  }

  ngOnInit() {
    this.initTraining();
  }

  initTraining() {
    this.teamService.teamDetail$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(team => {
          return this.dataService.getTrainingsByTeamId(team.id)
        })
      )
      .subscribe(trainings => {
        this.trainings = trainings;
      });
    this.dataService.getTrainingsByTeamId(this.teamId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(trainings => {
        this.trainings = trainings;
      })
  }

  changeToContact() {
    this.contactVisible = true;
    this.nuTableVisible = false;
    this.nuGamesVisible = false;
  }


  changeToTable() {
    this.contactVisible = false;
    this.nuTableVisible = true;
    this.nuGamesVisible = false;
  }

  changeToGames() {
    this.contactVisible = false;
    this.nuTableVisible = false;
    this.nuGamesVisible = true;
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
