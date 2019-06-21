import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "firebase";
import {SghUser} from "./sgh-user";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {Credentials} from "../app-shell/auth/login-dialog/login-dialog.component";
import {AngularFireFunctions} from "@angular/fire/functions";
import {map} from "rxjs/operators";
import {Team} from "../teams/team";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  user: User;
  sghUser: SghUser;

  addUserFunction: any;

  constructor(private  afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private afFunctions: AngularFireFunctions) {
    this.addUserFunction = this.afFunctions.httpsCallable(FB_FUNCTIONS_ADD_USER);
    afAuth.user.subscribe(user => {
      this.user = user;
      if (user) {
        db.collection(SGH_USERS).doc<SghUser>(user.uid).get().toPromise().then(snap => {
          this.sghUser = snap.data() as SghUser;
        })
      } else {
        this.sghUser = undefined;
      }
    })
  }

  hasUserAddNewsAccess() {
    return this.isUserAdmin() || this.isUserEventAdmin() || (this.sghUser.teams && this.sghUser.teams.length > 0)
  }

  isUserAdmin(): boolean {
    return this.user && this.sghUser && this.sghUser.admin;
  }

  isUserHallAdmin() {
    return this.user && this.sghUser && this.sghUser.hallsAdmin;
  }

  isUserEventAdmin() {
    return this.user && this.sghUser && this.sghUser.eventsAdmin;
  }

  isUserTeamsAdmin() {
    return this.user && this.sghUser && this.sghUser.teamsAdmin;
  }

  hasUserRightsForTeam(teamAge: string, teamSeason: string): boolean {
    if (!this.sghUser || !this.sghUser.teams) return false;
    let hasRight = false;
    this.sghUser.teams.forEach(team => {
      if (team.includes(teamAge) && team.includes(teamSeason)) {
        hasRight = true;
      }
    });
    return hasRight;
  }

  getTeamRights(): string[] {
    return [];
  }

  getAllUsers(): Observable<SghUser[]> {
    if (this.isUserAdmin()) {
      return this.db.collection<SghUser>(SGH_USERS).snapshotChanges()
        .pipe(
          map(actions => {
              return actions.map(action => {
                const data = action.payload.doc.data() as SghUser;
                data.id = action.payload.doc.id;
                return data;
              })
            }
          )
        )
    } else {
      return of([]);
    }
  }

  addNewUser(credentials: Credentials, sghUser: SghUser): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.addUserFunction(JSON.parse(JSON.stringify(credentials))).toPromise()
        .then(uid => {
          this.db.collection(SGH_USERS).doc(uid).set(JSON.parse(JSON.stringify(sghUser)))
            .then(() => resolve(true))
            .catch(error => {
              console.error(error);
              reject(false)
            });
        });
    }))
  }

  changeAdminMode(sghUser: SghUser): Promise<any> {
    return this.db.collection(SGH_USERS).doc(sghUser.id).update({
      admin: sghUser.admin,
      hallsAdmin: sghUser.hallsAdmin,
      eventsAdmin: sghUser.eventsAdmin,
      teamsAdmin: sghUser.teamsAdmin,
      teams: sghUser.teams
    })
  }
}

// @ts-ignore
export const SGH_USERS = 'user';
// @ts-ignore
export const FB_FUNCTIONS_ADD_USER = 'addUser';
