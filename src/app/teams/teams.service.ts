import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Team} from "./team";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: Team[];
  teamsLoaded = false;
  yearToLoad = DEFAULT_YEAR;

  constructor(private db: AngularFirestore) {
  }

  loadAllTeams() {
    this.teamsLoaded = false;
    this.db.collection<Team>(DB_COLLECTION_TEAMS,
      ref =>
        ref.where('teamYear', '==', this.yearToLoad)
          .orderBy("position", "asc"))
      .snapshotChanges().pipe(
      map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Team;
            data.id = action.payload.doc.id;
            return data;
          })
        }
      )
    ).subscribe(teams => {
      this.teams = teams;
      this.teamsLoaded = true;
    });
  }

  changeOrder(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < this.teams.length; i++) {
        this.db.collection<Team>(DB_COLLECTION_TEAMS).doc(this.teams[i].id).update({
          position: i
        }).catch(() => reject());
      }
      resolve()
    });
  }

  addNewTeam(teamAge: string) {
    return this.db.collection<Team>(DB_COLLECTION_TEAMS)
      .add(JSON.parse(JSON.stringify(new Team(
        this.teams.length - 1,
        teamAge,
        this.yearToLoad
      ))))
  }


  deleteTeam(team: Team) {
    return this.db.collection<Team>(DB_COLLECTION_TEAMS).doc(team.id).delete();
  }
}

export const DB_COLLECTION_TEAMS = 'teams';

export const DEFAULT_YEAR = '2019/2020';
