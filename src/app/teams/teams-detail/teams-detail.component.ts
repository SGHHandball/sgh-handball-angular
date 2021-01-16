import {Component, Input} from '@angular/core';
import {Team} from "../../model/team";
import {Observable, Subject} from "rxjs";
import {TC_SAVE, TranslationService} from "../../translation.service";
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
