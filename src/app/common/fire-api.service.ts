import {Injectable} from "@angular/core";
import {
  AngularFirestore, CollectionReference,
  DocumentReference, Query, QueryFn
} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Observable, of} from "rxjs";
import {DB_COLLECTION_NEWS, News, NewsType} from "../news/news";
import {filter, map, mergeMap, switchMap} from "rxjs/operators";
import {FireBaseModel} from "../model/fire-base.model";
import {User} from "firebase";
import {Club, CLUBS_COLLECTION_NAME} from "../clubs/club";
import {AngularFireStorage} from "@angular/fire/storage";
import {Team} from "../teams/team";
import {environment} from "../../environments/environment";
import {ImageProgress} from "../model/image-progress";
import {SghUser} from "../admin/sgh-user";
import {AngularFireFunctions} from "@angular/fire/functions";
import {Credentials} from "../app-shell/auth/login-dialog/login-dialog.component";
import {FB_FUNCTIONS_ADD_USER, SGH_USERS} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class FireApiService {


  DB_COLLECTION_TEAMS = 'teams';

  protected constructor(public db: AngularFirestore,
                        public afAuth: AngularFireAuth,
                        public afStorage: AngularFireStorage,
                        private afFunctions: AngularFireFunctions
  ) {
  }

  //USER
  getUser(): Observable<User> {
    return this.afAuth.user;
  }

  addNewUser(credentials: Credentials, prename: string, lastName: string): Observable<boolean> {
    return this.afFunctions.httpsCallable(FB_FUNCTIONS_ADD_USER)
      .apply(JSON.parse(JSON.stringify(credentials)))
      .pipe(
        switchMap((uid: string) => {
          return from(
            this.db
              .collection(SGH_USERS)
              .doc(uid)
              .set(JSON.parse(JSON.stringify(
                {
                  id: '',
                  admin: false,
                  eventsAdmin: false,
                  hallsAdmin: false,
                  teamsAdmin: false,
                  trainingsAdmin: false,
                  documentsAdmin: false,
                  teams: [],
                  preName: prename,
                  lastName: lastName
                }
              )))
          )
        })
      );
  }

  changeUserRights(sghUser: SghUser): Observable<any> {
    return from(
      this.db.collection(SGH_USERS)
        .doc(sghUser.id)
        .update(
          {
            admin: sghUser.admin,
            hallsAdmin: sghUser.hallsAdmin,
            eventsAdmin: sghUser.eventsAdmin,
            teamsAdmin: sghUser.teamsAdmin,
            trainingsAdmin: sghUser.trainingsAdmin,
            teams: sghUser.teams
          }
        )
    )
  }

  getSghUser(): Observable<SghUser> {
    return this.afAuth.user
      .pipe(
        switchMap(
          user => {
            if (user) {
              return this.db
                .collection(SGH_USERS)
                .doc<SghUser>(user.uid)
                .get()
                .pipe(
                  switchMap(
                    snap => {
                      return of(snap.data() as SghUser)
                    }
                  )
                )
            }
            return of(undefined);
          }
        )
      );
  }

  getAllSghUsers(): Observable<SghUser[]> {
    return this.db.collection<SghUser>(SGH_USERS)
      .snapshotChanges()
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
  }

  hasUserRightsForTeam(teamAge: string, teamSeason: string): Observable<boolean> {
    return this.getSghUser()
      .pipe(
        switchMap(user => {
          if (!user || !user.teams) return of(false);
          return of(
            user.teams
              .filter(
                team =>
                  user.admin ||
                  team.includes(teamAge) &&
                  team.includes(teamSeason)).length > 0
          );
        })
      )
  }

  //NEWS

  getAllNews(orderAsc: boolean, limit?: number, newsType?: NewsType): Observable<News[]> {
    return this.afAuth.user.pipe(
      switchMap((user: User) => user ? this.getAuthCreatorNews(user.uid, newsType) : of([])),
      switchMap((newsWithCreator: News[]) =>
        this.getNormalUserNews(orderAsc, limit, newsType)
          .pipe(
            map((normalNews: News[]) => {
              const jointArray = [...newsWithCreator, ...normalNews];
              if (!environment.production) {
                console.log("allNews");
                console.log(jointArray);
              }
              return this.sortNewsByDate(jointArray);
            })
          )
      ));
  }


  getNewsById(id: string): Observable<News[]> {
    return this.db
      .collection<News>(
        DB_COLLECTION_NEWS,
        ref => {
          return ref.where(FireBaseModel.ID, '==', id)
        }
      ).valueChanges();
  }

  getAuthCreatorNews(userId: string, newsType?: NewsType): Observable<News[]> {
    return this.db.collection<News>(
      DB_COLLECTION_NEWS,
      ref => {
        let query: CollectionReference | Query = ref;
        query = query.where(FireBaseModel.CREATOR, '==', userId);
        query = query.where(FireBaseModel.CHECKED, '==', false);
        switch (newsType) {
          case NewsType.NEWS_TYPE_EVENT:
            query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_EVENT);
            break;
          case NewsType.NEWS_TYPE_REPORT:
            query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_REPORT);
            break;
        }
        return query;
      }
    ).valueChanges();
  }

  getNormalUserNews(orderAsc: boolean, limit?: number, newsType?: NewsType): Observable<News[]> {
    return this.db.collection<News>(DB_COLLECTION_NEWS, ref => {
        let query: CollectionReference | Query = ref;
        query = query.where(FireBaseModel.CHECKED, '==', true);
        query = query.orderBy(FireBaseModel.DATE, orderAsc ? 'asc' : 'desc');
        if (limit) query = query.limit(limit);
        switch (newsType) {
          case NewsType.NEWS_TYPE_EVENT:
            query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_EVENT);
            break;
          case NewsType.NEWS_TYPE_REPORT:
            query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_REPORT);
            break;
        }
        return query;
      }
    ).valueChanges();
  }


  getTeamNews(teamAge: string, teamSeason: string): Observable<News[]> {
    return this.hasUserRightsForTeam(teamAge, teamSeason).pipe(
      switchMap(
        userRights => {
          return this.db.collection<News>(DB_COLLECTION_NEWS, ref => {
              let query: CollectionReference | Query = ref;
              if (!userRights) {
                query = query.where(FireBaseModel.CHECKED, '==', true);
              }
              query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_REPORT);
              query = query.where(FireBaseModel.TEAM_AGE, '==', teamAge);
              query = query.where(FireBaseModel.TEAM_SEASON, '==', teamSeason);
              query = query.orderBy(FireBaseModel.DATE, 'asc');
              return query;
            }
          ).valueChanges();
        }
      )
    );
  }

  addNewNews(newsType: NewsType, newsTeam?: Team): Observable<News> {
    return this.afAuth.user
      .pipe(
        switchMap(
          (user: User) => {
            const newsTypeText = this.getNewNewsInitText(newsType);
            const newNews: News = {
              id: '',
              title: newsTypeText,
              body: newsTypeText,
              checked: false,
              score: '0:0 (0:0)',
              send: false,
              type: newsType,
              imgPaths: [],
              imgLinks: [],
              creator: user.uid,
              teamAge: newsTeam ? newsTeam.teamAge : undefined,
              teamSeason: newsTeam ? newsTeam.teamSeason : undefined,
            };
            return from(this.db.collection<News>(DB_COLLECTION_NEWS)
              .add(JSON.parse(JSON.stringify(newNews))))
              .pipe(
                switchMap(response => {
                  newNews.id = response.id;
                  return this.updateNewsID(response.id)
                    .pipe(
                      switchMap(_ => {
                        return of(newNews);
                      })
                    )
                })
              );
          }
        )
      )
  }


  updateNewsID(newsId: string): Observable<void> {
    return from(this.db.collection(DB_COLLECTION_NEWS).doc(newsId).update({
      id: newsId
    }));
  }

  getNewNewsInitText(newsType: NewsType): string {
    switch (newsType) {
      case NewsType.NEWS_TYPE_EVENT:
        return "Veranstaltung";
      case NewsType.NEWS_TYPE_REPORT:
        return "Spielbericht";
      default:
        return ''
    }
  }

  sortNewsByDate(news: News[]): News[] {
    return news.sort((val1, val2) => {
      return (val2.date - val1.date)
    });
  }

  deleteNews(news: News): Observable<void> {
    return from(this.db.collection(DB_COLLECTION_NEWS).doc(news.id).delete());
  }

  updateNewsSendToTrue(news: News): Observable<void> {
    return from(this.db.collection(DB_COLLECTION_NEWS).doc(news.id).update({
      send: true
    }));
  }

  updateNewsCheckToTrue(news: News): Observable<void> {
    return from(this.db.collection(DB_COLLECTION_NEWS).doc(news.id).update({
      checked: true
    }));
  }

  updateImagesInNews(news: News): Observable<void> {
    return from(this.db.collection(DB_COLLECTION_NEWS).doc(news.id).update({
      imgLinks: news.imgLinks,
      imgPaths: news.imgPaths
    }));
  }


  saveNewsToDataBase(news: News): Observable<void> {
    return from(
      this.db.collection<News>(DB_COLLECTION_NEWS)
        .doc(news.id)
        .set(
          JSON.parse(JSON.stringify(news))
        )
    )
  }

  //CLUBS

  addClub(clubName: string): Observable<DocumentReference> {
    return from(this.db.collection<Club>(CLUBS_COLLECTION_NAME)
      .add(
        JSON.parse(
          JSON.stringify(new Club(clubName))
        )
      ));
  }

  getClubs(): Observable<Club[]> {
    return this.db.collection<Club>(CLUBS_COLLECTION_NAME).valueChanges();
  }

  //TEAMS

  getTeamsBySeason(season: string): Observable<Team[]> {
    return this.db.collection<Team>(this.DB_COLLECTION_TEAMS,
      ref =>
        ref.where(FireBaseModel.TEAM_SEASON, '==', season)
          .orderBy(FireBaseModel.POSITION, "asc"))
      .snapshotChanges().pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Team;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      );
  }

  getTeamsBySeasonAndAge(season: string, teamAge: string): Observable<Team[]> {
    return this.db.collection<Team>(this.DB_COLLECTION_TEAMS,
      ref =>
        ref.where(FireBaseModel.TEAM_SEASON, '==', season)
          .where(FireBaseModel.TEAM_AGE, '==', teamAge)
          .orderBy(FireBaseModel.POSITION, "asc"))
      .snapshotChanges().pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Team;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      );
  }

  addNewTeam(position: number, season: string, teamAge: string): Observable<string> {
    return from(this.db.collection<Team>(this.DB_COLLECTION_TEAMS)
      .add(
        JSON.parse(
          JSON.stringify(
            {
              position: position,
              teamAge,
              teamSeason: season,
              imgPaths: [],
              imgLinks: []
            }
          )
        )
      )
    ).pipe(
      switchMap(response => {
        return of(response.id);
      })
    )
  }

  updateTeam(team: Team): Observable<void> {
    return from(this.db.collection<News>(this.DB_COLLECTION_TEAMS)
      .doc(team.id).set(JSON.parse(JSON.stringify(team))))
  }

  deleteTeam(team: Team): Observable<void> {
    return from(this.db.collection<News>(this.DB_COLLECTION_TEAMS)
      .doc(team.id).delete());
  }

  changeOrderOfTeams(teams: Team[]): Observable<void> {
    if (!teams) return of();
    return from(teams)
      .pipe(
        mergeMap(
          team =>
            this.db
              .collection<Team>(this.DB_COLLECTION_TEAMS)
              .doc(team.id)
              .update({
                  position: teams.indexOf(team)
                }
              )
        )
      );
  }


  updateImagesInTeam(team: Team): Observable<void> {
    return from(this.db.collection(this.DB_COLLECTION_TEAMS).doc(team.id).update({
      imgLinks: team.imgLinks,
      imgPaths: team.imgPaths
    }));
  }

  //IMAGES

  IMAGES_PATH = 'images';

  uploadImage(event, subPath?: string): Observable<ImageProgress> {
    const randomId = Math.random().toString(36).substring(2);
    const path = [this.IMAGES_PATH, subPath, randomId].join('/');
    const ref = this.afStorage.ref(path).put(event.target.files[0]);
    return ref
      .snapshotChanges()
      .pipe(
        switchMap(
          snapshot => {
            if (snapshot.bytesTransferred !== snapshot.totalBytes) {
              return of(
                {
                  progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                  uploadDone: false
                }
              )
            }
            return from(ref)
              .pipe(
                switchMap(
                  snap => {
                    return from(snap.ref.getDownloadURL())
                      .pipe(
                        switchMap(url => {
                          return of(
                            {
                              path: path,
                              url: url,
                              progress: 100,
                              uploadDone: true
                            }
                          )
                        })
                      )
                  }
                )
              )
          }
        )
      );
  }

  getDownloadPath(path: string): Observable<string> {
    return this.afStorage.ref(path).getDownloadURL();
  }

  downloadImages(paths: string[]): Observable<string> {
    if (!paths) return of();
    return from(paths)
      .pipe(
        mergeMap(
          path => this.afStorage.ref(path).getDownloadURL()
        )
      );
  }

  deleteImage(path: string): Observable<any> {
    return this.afStorage.ref(path).delete();
  }


}
