import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Season} from "./season";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  seasons: Season[];

  constructor(private db: AngularFirestore) {
    this.db.collection<Season>(DB_COLLECTION_SEASONS).valueChanges().subscribe(seasons => {
      this.seasons = seasons;
    });
  }


  getSeasonAsString(season: Season): string {
    return season.beginningYear + '/' + season.endingYear;
  }
}

export const DB_COLLECTION_SEASONS = 'seasons';
