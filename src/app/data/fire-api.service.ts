import {Injectable} from "@angular/core";
import {
  AngularFirestore, CollectionReference,
  DocumentReference, Query
} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Observable, of} from "rxjs";
import {DB_COLLECTION_NEWS, News, NewsType} from "../model/news";
import {filter, map, mergeMap, switchMap} from "rxjs/operators";
import {FireBaseModel} from "../model/fire-base.model";
import {User} from "firebase";
import {Club, CLUBS_COLLECTION_NAME} from "../model/club";
import {AngularFireStorage} from "@angular/fire/storage";
import {Team} from "../model/team";
import {environment} from "../../environments/environment";
import {ImageProgress} from "../model/image-progress";
import {SghUser} from "../model/sgh-user";
import {AngularFireFunctions} from "@angular/fire/functions";
import {
  DB_COLLECTION_CONTENT, DB_COLLECTION_CONTENT_HOME,
  DB_COLLECTION_CURRENT_SEASON,
  DB_COLLECTION_HALLS,
  DB_COLLECTION_SEASONS, DB_COLLECTION_SPONSORS,
  DB_COLLECTION_TRAININGS,
  FB_FUNCTIONS_ADD_USER,
  SGH_USERS
} from "../constants";
import {Hall} from "../model/hall";
import {Training} from "../model/training";
import {Season} from "../model/season";
import {Content} from "../model/content";
import {IImage} from "ng2-image-compress";
import {Sponsor} from "../model/sponsor";
import {InfiniteNews} from "../model/infinite-news";
import {Credentials} from "../model/Credentials";

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
  login(credentials: Credentials): Observable<any> {
    return from(
      this.afAuth.auth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
    )
  }

  logout(): Observable<void> {
    return from(this.afAuth.auth.signOut())
  }


  getUser(): Observable<User> {
    return this.afAuth.user;
  }

  addNewUser(credentials: Credentials, prename: string, lastName: string): Observable<void> {
    const addUserFunction = this.afFunctions.httpsCallable(FB_FUNCTIONS_ADD_USER);
    return addUserFunction(JSON.parse(JSON.stringify(credentials)))
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
                  sponsorAdmin: false,
                  teams: [],
                  preName:
                  prename,
                  lastName:
                  lastName
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
        .set(sghUser)
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
                      const sghUser = snap.data() as SghUser;
                      sghUser.id = user.uid;
                      return of(sghUser)
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
          if (user && user.admin) return of(true);
          if (!user || !user.teams) return of(false);
          return of(
            user.teams
              .filter(
                team =>
                  team.includes(teamAge) &&
                  team.includes(teamSeason)).length > 0
          );
        })
      )
  }


  //NEWS

  getAllNews(newsType?: NewsType): Observable<News[]> {
    return this.getNewsByType(newsType)
      .pipe(
        map((normalNews: News[]) => {
          if (!environment.production) {
            console.log("allNews");
            console.log(normalNews);
          }
          return normalNews;
        })
      )
  }

  getNewsWithInfinite(lastDoc?: any, checked?: boolean): Observable<InfiniteNews> {
    return this.db.collection<News>(
      DB_COLLECTION_NEWS,
      ref => {
        let query: CollectionReference | Query = ref;
        if (checked) query = query.where(FireBaseModel.CHECKED, '==', true);
        query = query.orderBy(FireBaseModel.DATE, 'desc');
        if (lastDoc) query = query.startAfter(lastDoc);
        query = query.limit(9);
        return query;
      }
    ).get()
      .pipe(
        switchMap(snap => {
          const lastVisible = snap.docs[snap.docs.length - 1];
          const news = snap.docs.map(doc => doc.data() as News);
          const infiniteNews: InfiniteNews = {
            news: news,
            lastItem: lastVisible
          };
          return of(infiniteNews);
        })
      );
  }


  getNewsById(id: string): Observable<News> {
    return this.db
      .collection<News>(
        DB_COLLECTION_NEWS)
      .doc<News>(id)
      .get().pipe(map(snap => {
        return snap.data() as News
      }));
  }

  getNewsByType(newsType?: NewsType): Observable<News[]> {
    return this.db.collection<News>(
      DB_COLLECTION_NEWS,
      ref => {
        let query: CollectionReference | Query = ref;
        query = query.orderBy(FireBaseModel.DATE, 'desc');
        switch (newsType) {
          case NewsType.NEWS_TYPE_TEAM_EVENT:
            query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_TEAM_EVENT);
            break;
          case NewsType.NEWS_TYPE_SPECIAL:
            query = query.where(FireBaseModel.TYPE, '==', NewsType.NEWS_TYPE_SPECIAL);
            break;
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
              query = query.where(FireBaseModel.TEAM_AGE, '==', teamAge);
              query = query.where(FireBaseModel.TEAM_SEASON, '==', teamSeason);
              query = query.orderBy(FireBaseModel.DATE, 'desc');
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
              checked: true,
              score: '0:0 (0:0)',
              send: true,
              type: newsType,
              imgPaths: [],
              imgLinks: [],
              creator: user.uid,
              teamAge: newsTeam ? newsTeam.teamAge : "",
              teamSeason: newsTeam ? newsTeam.teamSeason : "",
              date: new Date().getTime(),
              eventDate: new Date().getTime()
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
      case NewsType.NEWS_TYPE_TEAM_EVENT:
        return "Team Event";
      case NewsType.NEWS_TYPE_SPECIAL:
        return "Sonderbericht";
      case NewsType.NEWS_TYPE_REPORT:
        return "Spielbericht";
      default:
        return ''
    }
  }

  deleteNews(news: News): Observable<void> {
    return from(this.db.collection(DB_COLLECTION_NEWS).doc(news.id).delete());
  }

  updateNews(news: News): Observable<void> {
    return from(
      this.db
        .collection(DB_COLLECTION_NEWS)
        .doc(news.id)
        .set(news)
    );
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

  getTeamById(id: string): Observable<Team> {
    return this.db
      .collection<Team>(this.DB_COLLECTION_TEAMS)
      .doc<Team>(id)
      .valueChanges();
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
              imgLinks: [],
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

  uploadImage(image: IImage, subPath?: string): Observable<ImageProgress> {
    const randomId = Math.random().toString(36).substring(2);
    const path = [this.IMAGES_PATH, subPath, randomId].join('/');
    const ref = this.afStorage.ref(path).putString(image.imageDataUrl, 'data_url');
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

  //HALLS

  getAllHalls(): Observable<Hall[]> {
    return this.db
      .collection<Hall>(DB_COLLECTION_HALLS)
      .snapshotChanges()
      .pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Hall;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      );
  }

  addHall(hall: Hall): Observable<string> {
    return from(this.db
      .collection<Hall>(DB_COLLECTION_HALLS)
      .add(JSON.parse(JSON.stringify(hall))))
      .pipe(
        switchMap(
          response => {
            return of(response.id);
          }
        )
      )
  }

  changeHall(hall: Hall): Observable<void> {
    return from(this.db.collection<Hall>(DB_COLLECTION_HALLS)
      .doc(hall.id)
      .update(
        {
          hallId: hall.hallId,
          name: hall.name,
          street: hall.street,
          postCode: hall.postCode,
          city: hall.city,
        }
      )
    )
  }

  deleteHall(hall: Hall): Observable<void> {
    return from(
      this.db
        .collection<Hall>(DB_COLLECTION_HALLS)
        .doc(hall.id)
        .delete()
    );
  }

  // TRAINING

  getAllTrainings(): Observable<Training[]> {
    return this.db.collection<Training>(DB_COLLECTION_TRAININGS,
      ref => ref.orderBy(FireBaseModel.EDIT_TIME, "asc"))
      .snapshotChanges()
      .pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Training;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      )
  }

  getTrainingsByTeamId(teamId: string): Observable<Training[]> {
    return this.db.collection<Training>(DB_COLLECTION_TRAININGS,
      ref => ref.where(FireBaseModel.TEAM_ID, '==', teamId))
      .snapshotChanges()
      .pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Training;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      )
  }

  addTraining(training: Training): Observable<string> {
    return from(
      this.db
        .collection<Training>(DB_COLLECTION_TRAININGS)
        .add(JSON.parse(JSON.stringify(training)))
    )
      .pipe(
        switchMap(result => {
          return of(result.id)
        })
      )
  }

  changeTraining(training: Training): Observable<void> {
    return from(
      this.db
        .collection<Training>(DB_COLLECTION_TRAININGS)
        .doc(training.id)
        .set(training)
    );
  }

  deleteTraining(training: Training): Observable<void> {
    return from(
      this.db
        .collection<Training>(DB_COLLECTION_TRAININGS)
        .doc(training.id)
        .delete());
  }

  //SEASONS

  getSeasons(): Observable<Season[]> {
    return this.db.collection<Season>(DB_COLLECTION_SEASONS).valueChanges();
  }

  getCurrentSeason(): Observable<Season> {
    return this.db
      .collection<Season>(DB_COLLECTION_CURRENT_SEASON)
      .doc<Season>(DB_COLLECTION_CURRENT_SEASON).valueChanges();
  }

  changeCurrentSeason(season: Season): Observable<void> {
    return from(this.db
      .collection<Season>(DB_COLLECTION_CURRENT_SEASON)
      .doc<Season>(DB_COLLECTION_CURRENT_SEASON)
      .set(season));
  }

  //CONTENT

  getContent(topic: string): Observable<Content> {
    return this.db
      .collection<Content>(DB_COLLECTION_CONTENT)
      .doc<Content>(topic)
      .valueChanges();
  }

  addContent(topic: string, content: Content): Observable<void> {
    return from(this.db
      .collection<Content>(DB_COLLECTION_CONTENT)
      .doc<Content>(topic)
      .set(content))
  }

  //SPONSORS
  getSponsors(): Observable<Sponsor[]> {
    return this.db.collection<Sponsor>(DB_COLLECTION_SPONSORS)
      .snapshotChanges()
      .pipe(
        map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data() as Sponsor;
              data.id = action.payload.doc.id;
              return data;
            })
          }
        )
      )
  }

  getSponsorsById(id: string): Observable<Sponsor> {
    return this.db
      .collection<Sponsor>(
        DB_COLLECTION_SPONSORS)
      .doc<Sponsor>(id)
      .valueChanges()
      .pipe(
        map(sponsor => {
          sponsor.id = id;
          return sponsor;
        })
      );
  }

  addSponsor(sponsor: Sponsor): Observable<string> {
    return from(
      this.db
        .collection<Sponsor>(DB_COLLECTION_SPONSORS)
        .add(JSON.parse(JSON.stringify(sponsor)))
    )
      .pipe(
        switchMap(result => {
          return of(result.id)
        })
      )
  }

  changeSponsor(sponsor: Sponsor): Observable<void> {
    return from(
      this.db
        .collection<Sponsor>(DB_COLLECTION_SPONSORS)
        .doc<Sponsor>(sponsor.id)
        .set(JSON.parse(JSON.stringify(sponsor)))
    );
  }

  deleteSponsor(sponsorId: string): Observable<void> {
    return from(
      this.db
        .collection<Sponsor>(DB_COLLECTION_SPONSORS)
        .doc<Sponsor>(sponsorId)
        .delete());
  }


}
