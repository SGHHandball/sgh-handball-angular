import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Team} from "./team";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {DB_COLLECTION_NEWS, News} from "../news/news";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: Team[];
  teamsLoaded = false;
  seasonToLoad = DEFAULT_YEAR;

  editTeamsActive = false;

  constructor(private db: AngularFirestore,
              private afStorage: AngularFireStorage) {
  }

  loadAllTeams(): Promise<void> {
    return new Promise<void>(resolve => {
      this.teamsLoaded = false;
      this.db.collection<Team>(DB_COLLECTION_TEAMS,
        ref =>
          ref.where('teamSeason', '==', this.seasonToLoad)
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
        resolve();
      });
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
        this.seasonToLoad
      ))))
  }

  saveNewTeamValues(team: Team, onChangeFun: () => any) {
    this.db.collection<News>(DB_COLLECTION_TEAMS)
      .doc(team.id).set(JSON.parse(JSON.stringify(team))).finally(onChangeFun)
  }


  deleteTeam(team: Team) {
    return this.db.collection<Team>(DB_COLLECTION_TEAMS).doc(team.id).delete();
  }

  uploadImage(event): AngularFireUploadTask {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(randomId);
    return ref.put(event.target.files[0]);
  }

  getTeamById(teamId: string): Team {
    let teamToReturn = undefined;
    this.teams.forEach(team => {
      if (team.id === teamId) teamToReturn = team;
    });
    return teamToReturn;
  }

  getTeamAsString(team: Team): string {
    return team.teamAge;
  }
}

export const DB_COLLECTION_TEAMS = 'teams';

export const DEFAULT_YEAR = '2019/2020';

