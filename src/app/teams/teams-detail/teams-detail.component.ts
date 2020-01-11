import {Component, Input} from '@angular/core';
import {Team} from "../../model/team";
import {MatDialog} from "@angular/material";
import {switchMap, takeUntil} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultDialogComponent, DialogData} from "../../shared/default-dialog/default-dialog.component";
import {
  TC_CANCEL,
  TC_GENERAL_DELETE_HEADER,
  TC_GENERAL_DELETE_MESSAGE, TC_SAVE,
  TranslationService
} from "../../translation.service";
import {DataService} from "../../data/data.service";
import {FormControl} from "@angular/forms";
import {SliderService} from "../../shared/slider/slider.service";
import {IImage} from "ng2-image-compress";
import {AbstractService} from "../../shared/abstract.service";
import {Content} from "../../model/content";

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent {

  @Input() team: Team;

  uploadProgress: Observable<number>;

  destroy$ = new Subject();

  saveTC = TC_SAVE;

  constructor(public abstractService: AbstractService,
              public translationService: TranslationService
  ) {
  }

  getContentOfTeam(team: Team): Content {
    return {
      contentText: team.teamText,
      imgPaths: team.imgPaths,
      imgLinks: team.imgLinks
    }
  }

}
