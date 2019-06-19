import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {DB_COLLECTION_NEWS, News} from "../news/news";
import {AbstractNewsService, NEWS_TYPE_EVENT} from "../abstract/abstract-news.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireStorage} from "@angular/fire/storage";
import {TranslationService} from "../translation.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class EventService extends AbstractNewsService {


  constructor(db: AngularFirestore, afAuth: AngularFireAuth, afStorage: AngularFireStorage, translationService: TranslationService) {
    super(db, afAuth, afStorage, translationService);
  }

  getUnAuthNewsRef(): AngularFirestoreCollection<News> {
    return this.db.collection<News>(DB_COLLECTION_NEWS, ref =>
      ref.where('checked', '==', true)
        .where('type', '==', NEWS_TYPE_EVENT)
    );
  }

  getAuthCreatorNewsRef(): AngularFirestoreCollection<News> {
    if (!this.user) return undefined;
    return this.db.collection<News>(DB_COLLECTION_NEWS,
      ref => ref
        .where('creator', '==', this.user.uid)
        .where('checked', '==', false)
        .where('type', '==', NEWS_TYPE_EVENT));
  }


}
