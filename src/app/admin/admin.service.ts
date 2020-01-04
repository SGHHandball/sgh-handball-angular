import {Injectable} from '@angular/core';
import {SghUser} from "../model/sgh-user";
import {Observable, of} from "rxjs";
import {DataService} from "../data/data.service";
import {switchMap} from "rxjs/operators";
import {Credentials} from "../model/Credentials";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private dataService: DataService) {
  }

  hasUserAddNewsAccess(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.admin || sghUser.eventsAdmin || sghUser.teams && sghUser.teams.length > 0);
        })
      );
  }

  isUserAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.admin);
        })
      );
  }

  isUserSponsorAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.sponsorAdmin);
        })
      );
  }

  hasUserTeamRights(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          if (sghUser.admin) return of(true);
          return of(sghUser.teams && sghUser.teams.length > 0);
        })
      );
  }

  isUserHallAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.hallsAdmin);
        })
      );
  }

  isUserEventAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.eventsAdmin);
        })
      );
  }

  isUserTeamsAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.teamsAdmin);
        })
      );
  }

  isUserTrainingsAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.trainingsAdmin);
        })
      );
  }

  isUserDocumentsAdmin(): Observable<boolean> {
    return this.dataService.getSghUser()
      .pipe(
        switchMap(sghUser => {
          if (!sghUser) return of(false);
          return of(sghUser.documentsAdmin);
        })
      );
  }

  getAllUsers(): Observable<SghUser[]> {
    return this.dataService.getAllSghUsers();
  }

  addNewUser(credentials: Credentials, prename: string, lastName: string): Observable<void> {
    return this.dataService.addNewUser(credentials, prename, lastName);
  }

  changeUserRights(sghUser: SghUser): Observable<any> {
    return this.dataService.changeUserRights(sghUser);
  }

}

