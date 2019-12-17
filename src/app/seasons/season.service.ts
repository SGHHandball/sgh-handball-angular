import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Season} from "./season";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {


  getSeasonAsString(season: Season): string {
    if (!season) return '';
    return season.beginningYear + '-' + season.endingYear;
  }
}

