import {Injectable} from '@angular/core';
import {DB_COLLECTION_NEWS, News} from "./news";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference, DocumentChangeAction,
  Query,
  QueryFn
} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {
  TC_BEST_CLUB_ON_EARTH,
  TC_NEWS_PATH_DETAIL,
  TC_NEWS_PATH_EDIT,
  TC_NEWS_SUMMARY,
  TC_NEWS_TYPE_REPORT, TC_ROUTE_NEWS,
  TranslationService
} from "../translation.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "firebase";
import {Observable, combineLatest, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Club, CLUBS_COLLECTION_NAME} from "../clubs/club";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: News[];
  newsLoaded = false;

  clubs: Club[];

  expandedNews: News;
  expandedNewsEdit: boolean = false;

  user: User;
  unAuthNewsRef: AngularFirestoreCollection<News>;
  authCreatorNewsRef: AngularFirestoreCollection<News>;

  constructor(private db: AngularFirestore,
              public afAuth: AngularFireAuth,
              private router: Router,
              private translationService: TranslationService) {
    this.unAuthNewsRef = this.db.collection<News>(DB_COLLECTION_NEWS,
      ref => ref.where('checked', '==', true));
    this.afAuth.user.subscribe(user => {
      this.user = user;
      if (user) {
        this.authCreatorNewsRef = this.db.collection<News>(DB_COLLECTION_NEWS,
          ref => ref
            .where('creator', '==', user.uid)
            .where('checked', '==', false));
      } else {
        this.authCreatorNewsRef = undefined;
      }
      this.loadAllNews();
    });
    this.db.collection<Club>(CLUBS_COLLECTION_NAME).valueChanges().subscribe(clubs => {
      this.clubs = clubs;
    });
  }


  loadAllNews() {
    if (this.authCreatorNewsRef) {
      this.initCreatorNews();
    } else {
      this.initNormalNews();
    }
    this.newsLoaded = true;
  }

  initNormalNews() {
    this.unAuthNewsRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => this.addIdToNews(action))
      )
    ).subscribe(news => {
      this.news = news;
    });
  }

  initCreatorNews() {
    combineLatest(this.unAuthNewsRef.snapshotChanges(),
      this.authCreatorNewsRef.snapshotChanges()).pipe(
      switchMap(actions => {
        const [unAuthNews, authCreatorNews] = actions;
        const combined = unAuthNews.concat(authCreatorNews);
        return [
          combined.map(action => this.addIdToNews(action))
        ]
      })
    ).subscribe(news => {
      this.news = news;
    });
  }

  addIdToNews(action: DocumentChangeAction<News>): News {
    const data = action.payload.doc.data() as News;
    data.id = action.payload.doc.id;
    return data;
  }

  addNewNews(newsType: NewsType) {
    if (this.user) {
      const newsTypeText = this.getNewNewsInitText(newsType);
      const newNews = new News()
        .withTitleAndBody(newsTypeText, newsTypeText)
        .withSummary(this.translationService.get(TC_NEWS_SUMMARY))
        .withCreator(this.user.uid);

      this.db.collection<News>(DB_COLLECTION_NEWS)
        .add(JSON.parse(JSON.stringify(newNews)))
        .then(response => {
          newNews.id = response.id;
          this.openNewsEdit(newNews);
        })
    } else {
      // TODO: Handle if user is not know, which should never happen
    }
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

  getNewNewsInitText(newsType: NewsType): string {
    switch (newsType) {
      case NewsType.report:
        return this.translationService.get(TC_NEWS_TYPE_REPORT);
      default:
        return ''
    }
  }


  saveNewsToDataBase(news: News, onChangeFun: () => any) {
    this.db.collection<News>(DB_COLLECTION_NEWS)
      .doc(news.id).set(JSON.parse(JSON.stringify(news))).finally(onChangeFun)
  }


  openNewsDetail(toExpandNews: News) {
    this.expandedNewsEdit = false;
    this.changeExpandedNews(toExpandNews);
    this.router.navigate([TC_ROUTE_NEWS + '/' + TC_NEWS_PATH_DETAIL])
  }


  openNewsEdit(toExpandNews: News) {
    this.expandedNewsEdit = true;
    this.changeExpandedNews(toExpandNews);
    this.router.navigate([TC_ROUTE_NEWS + '/' + TC_NEWS_PATH_EDIT])
  }


  closeExpandedNews() {
    this.expandedNewsEdit = false;
    this.changeExpandedNews(undefined);
    this.router.navigate([TC_ROUTE_NEWS])
  }


  changeExpandedNews(toExpandNews: News | undefined) {
    this.expandedNews = toExpandNews;
  }

  saveNewClubToCollection(clubName: string) {
    if (!this.isClubListContainingClubName(clubName)) {
      this.db.collection<Club>(CLUBS_COLLECTION_NAME).add(JSON.parse(JSON.stringify(new Club(clubName))));
    }
  }

  isClubListContainingClubName(clubName: string): boolean {
    let containing = false;
    this.clubs.forEach((club: Club) => {
      if (club.name === clubName) {
        containing = true;
      }
    });
    return containing;
  }
}


export enum NewsType {
  report
}
