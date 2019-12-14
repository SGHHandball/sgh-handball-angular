import {Injectable} from "@angular/core";
import {
  AngularFirestore, CollectionReference,
  DocumentReference, Query, QueryFn
} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {from, Observable, of} from "rxjs";
import {DB_COLLECTION_NEWS, News, NewsType} from "../news/news";
import {map, mergeMap, switchMap} from "rxjs/operators";
import {FireBaseModel} from "../model/fire-base.model";
import {User} from "firebase";
import {Club, CLUBS_COLLECTION_NAME} from "../clubs/club";
import {AngularFireStorage} from "@angular/fire/storage";
import {Team} from "../teams/team";
import {environment} from "../../environments/environment";
import {UploadTaskSnapshot} from "@angular/fire/storage/interfaces";
import {ImageProgress} from "../model/image-progress";

@Injectable({
  providedIn: 'root'
})
export class FireApiService {

  protected constructor(public db: AngularFirestore,
                        public afAuth: AngularFireAuth,
                        public afStorage: AngularFireStorage) {
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


  //IMAGES

  IMAGES_PATH = 'images';

  uploadImage(event, subPath?: string): Observable<ImageProgress> {
    const randomId = Math.random().toString(36).substring(2);
    const path = [this.IMAGES_PATH, subPath, randomId].join('/');
    const ref = this.afStorage.ref(path);
    return ref
      .put(event.target.files[0])
      .snapshotChanges()
      .pipe(
        switchMap(
          snapshot =>
            of(
              {
                path: path,
                progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                uploadDone: snapshot.bytesTransferred === snapshot.totalBytes
              }
            )
        )
      )
      ;
  }

  downloadImage(path: string): Observable<string> {
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
