import {DB_COLLECTION_NEWS, News} from "../news/news";
import {User} from "firebase";
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {map, switchMap} from "rxjs/operators";
import {combineLatest, Subject} from "rxjs";
import {TC_NEWS_TYPE_EVENT, TC_NEWS_TYPE_REPORT, TranslationService} from "../translation.service";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";

export abstract class AbstractNewsService {
  news: News[];
  $newsLoaded = new Subject();
  newsLoaded = false;
  user: User;


  expandedNews: News;

  protected constructor(public db: AngularFirestore,
                        public afAuth: AngularFireAuth,
                        public afStorage: AngularFireStorage,
                        public translationService: TranslationService) {
    this.afAuth.user.subscribe(user => {
      this.user = user;
      this.loadAllNews();
    });
  }

  loadAllNews() {
    if (this.user && this.getAuthCreatorNewsRef()) {
      this.initCreatorNews();
    } else {
      this.initNormalNews();
    }
  }

  abstract getUnAuthNewsRef(): AngularFirestoreCollection<News>;

  abstract getAuthCreatorNewsRef(): AngularFirestoreCollection<News>;

  initNormalNews() {
    this.getUnAuthNewsRef().snapshotChanges().pipe(
      map(actions =>
        actions.map(action => this.addIdToNews(action))
      )
    ).subscribe(news => this.setupNews(news));
  }

  initCreatorNews() {
    if (this.getAuthCreatorNewsRef())
      combineLatest(this.getUnAuthNewsRef().snapshotChanges(),
        this.getAuthCreatorNewsRef().snapshotChanges()).pipe(
        switchMap(actions => {
          const [unAuthNews, authCreatorNews] = actions;
          const combined = unAuthNews.concat(authCreatorNews);
          return [
            combined.map(action => this.addIdToNews(action))
          ]
        })
      ).subscribe(news => this.setupNews(news));
  }


  setupNews(news: News[]) {
    this.news = news.sort((val1, val2) => {
      return (val2.date - val1.date)
    });
    this.$newsLoaded.next(true);
    this.newsLoaded = true;
  }

  addIdToNews(action: DocumentChangeAction<News>): News {
    const data = action.payload.doc.data() as News;
    data.id = action.payload.doc.id;
    return data;
  }


  deleteNews(news: News) {
    return this.db.collection(DB_COLLECTION_NEWS).doc(news.id).delete();
  }

  updateNewsSendToTrue(news: News) {
    return this.db.collection(DB_COLLECTION_NEWS).doc(news.id).update({
      send: true
    });
  }

  updateNewsCheckToTrue(news: News) {
    return this.db.collection(DB_COLLECTION_NEWS).doc(news.id).update({
      checked: true
    });
  }

  getNewNewsInitText(newsType: string): string {
    switch (newsType) {
      case NEWS_TYPE_EVENT:
        return this.translationService.get(TC_NEWS_TYPE_EVENT);
      case NEWS_TYPE_REPORT:
        return this.translationService.get(TC_NEWS_TYPE_REPORT);
      default:
        return ''
    }
  }


  saveNewsToDataBase(news: News, onChangeFun: () => any) {
    this.db.collection<News>(DB_COLLECTION_NEWS)
      .doc(news.id).set(JSON.parse(JSON.stringify(news))).finally(onChangeFun)
  }


  uploadImage(event): AngularFireUploadTask {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(randomId);
    return ref.put(event.target.files[0]);
  }
}


export const NEWS_TYPE_REPORT = 'report';
export const NEWS_TYPE_EVENT = 'event';
