import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireStorage} from "@angular/fire/storage";
import {TranslationService} from "../translation.service";
import {combineLatest, Observable} from "rxjs";
import {DB_COLLECTION_NEWS, News} from "../news/news";
import {map, switchMap} from "rxjs/operators";
import {FireBaseModel} from "./fire-base.model";
import {User} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class FireApiService {

  protected constructor(public db: AngularFirestore,
                        public afAuth: AngularFireAuth,
                        public afStorage: AngularFireStorage) {
  }


  getAllNews(orderAsc: boolean, limit: number): Observable<News[]> {
    return this.afAuth.user.pipe(
      switchMap((user: User) => this.getAuthCreatorNews(user.uid)),
      switchMap((newsWithCreator: News[]) =>
        this.getNormalUserNews(orderAsc, limit)
          .pipe(
            map((normalNews: News[]) => {
              return this.sortNewsByDate(normalNews.concat(newsWithCreator));
            })
          )
      ));
  }

  getAuthCreatorNews(userId: string): Observable<News[]> {
    return this.db.collection<News>(
      DB_COLLECTION_NEWS,
      ref => ref
        .where(FireBaseModel.CREATOR, '==', userId)
        .where(FireBaseModel.CHECKED, '==', false))
      .valueChanges();
  }

  getNormalUserNews(orderAsc: boolean, limit?: number): Observable<News[]> {
    return this.db.collection<News>(DB_COLLECTION_NEWS, ref => {
        ref.where(FireBaseModel.CHECKED, '==', true);
        ref.orderBy('date', orderAsc ? 'asc' : 'desc');
        if (limit) ref.limit(limit);
        return ref;
      }
    ).valueChanges();
  }

  sortNewsByDate(news: News[]): News[] {
    return news.sort((val1, val2) => {
      return (val2.date - val1.date)
    });
  }
}
