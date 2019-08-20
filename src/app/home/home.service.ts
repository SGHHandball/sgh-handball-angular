import { Injectable } from '@angular/core';
import {AbstractNewsService} from "../abstract/abstract-news.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireStorage} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {TranslationService} from "../translation.service";
import {DB_COLLECTION_NEWS, News} from "../news/news";

@Injectable({
  providedIn: 'root'
})
export class HomeService extends AbstractNewsService{

  constructor(db: AngularFirestore,
              afAuth: AngularFireAuth,
              afStorage: AngularFireStorage,
              private router: Router,
              translationService: TranslationService) {
    super(db, afAuth, afStorage, translationService);
  }

  getAuthCreatorNewsRef(): AngularFirestoreCollection<News> {
    return undefined;
  }

  getUnAuthNewsRef(): AngularFirestoreCollection<News> {
    return this.db.collection<News>(DB_COLLECTION_NEWS, ref =>
      ref.where('checked', '==', true)
        .orderBy('date','asc').limit(10)
    );
  }
}
