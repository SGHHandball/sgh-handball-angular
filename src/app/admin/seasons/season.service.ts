import {Injectable} from '@angular/core';
import {Season} from "../../model/season";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {


  getSeasonAsString(season: Season): string {
    if (!season) return '';
    return season.beginningYear + '-' + season.endingYear;
  }
}

