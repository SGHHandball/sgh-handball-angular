import {Injectable} from '@angular/core';
import {DB_COLLECTION_NEWS, News, NEWS_TEAM_YOUTH_AGES} from "./news";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference, DocumentChangeAction,
  Query, QueryDocumentSnapshot,
  QueryFn
} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {
  TC_BEST_CLUB_ON_EARTH, TC_NEWS_GENDER_M, TC_NEWS_GENDER_W,
  TC_NEWS_PATH_DETAIL,
  TC_NEWS_PATH_EDIT,
  TC_NEWS_SUMMARY, TC_NEWS_TEAM_MEN, TC_NEWS_TEAM_WOMEN, TC_NEWS_TEAM_YOUTH,
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

  newsTeamAges: string[] = [];

  expandedNews: News;
  expandedNewsEdit: boolean = false;

  user: User;

  constructor(private db: AngularFirestore,
              public afAuth: AngularFireAuth,
              private router: Router,
              private translationService: TranslationService) {
    this.addTeamAges();
    this.afAuth.user.subscribe(user => {
      this.user = user;
      this.loadAllNews();
    });
    this.db.collection<Club>(CLUBS_COLLECTION_NAME).valueChanges().subscribe(clubs => {
      this.clubs = clubs;
    });
  }

  getUnAuthNewsRef(): AngularFirestoreCollection<News> {
    return this.db.collection<News>(DB_COLLECTION_NEWS, ref =>
      ref.where('checked', '==', true)
    );
  }

  getAuthCreatorNewsRef(): AngularFirestoreCollection<News> {
    if (!this.user) return undefined;
    return this.db.collection<News>(DB_COLLECTION_NEWS,
      ref => ref
        .where('creator', '==', this.user.uid)
        .where('checked', '==', false));
  }


  loadAllNews() {
    if (this.user) {
      this.initCreatorNews();
    } else {
      this.initNormalNews();
    }
  }

  getFilterNews(filterValues: string[]): News[] {
    if (this.news && filterValues && filterValues.length > 0) {
      const filteredNews = [];
      this.news.forEach(news => {
        if (this.areFiltersInNews(news, filterValues) && !filteredNews.includes(news)) {
          filteredNews.push(news);
        }
      });
      return filteredNews;
    }
    return this.news;
  }

  areFiltersInNews(news: News, filterValues: string[]): boolean {
    let allFiltersInNews = true;
    filterValues.forEach(filter => {
      if (!this.isFilterInNews(news, filter.toLowerCase())) {
        allFiltersInNews = false;
      }
    });
    return allFiltersInNews;
  }


  isFilterInNews(news: News, filter: string): boolean {
    return news.homeTeam.toLowerCase().includes(filter) ||
      news.enemyTeam.toLowerCase().includes(filter) ||
      news.body.toLowerCase().includes(filter) ||
      news.title.toLowerCase().includes(filter) ||
      news.summary.toLowerCase().includes(filter) ||
      news.teamAge.toLowerCase() === filter ||
      news.teamYear.toLowerCase() === filter
      ;
  }

  setupNews(news: News[]) {
    this.news = news;
    this.newsLoaded = true;
  }

  initNormalNews() {
    this.getUnAuthNewsRef().snapshotChanges().pipe(
      map(actions =>
        actions.map(action => this.addIdToNews(action))
      )
    ).subscribe(news => this.setupNews(news));
  }

  initCreatorNews() {
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
    this.router.navigate([this.router.url.replace('/', '') + '/' + TC_NEWS_PATH_DETAIL])
  }


  openNewsEdit(toExpandNews: News) {
    this.expandedNewsEdit = true;
    this.changeExpandedNews(toExpandNews);
    this.router.navigate([this.router.url.replace('/', '') + '/' + TC_NEWS_PATH_EDIT])
  }


  closeExpandedNews() {
    this.expandedNewsEdit = false;
    this.changeExpandedNews(undefined);
    this.router.navigate([this.router.url.replace(TC_NEWS_PATH_DETAIL, '').replace('/', '')])
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

  addTeamAges() {
    this.newsTeamAges.push(this.translationService.get(TC_NEWS_TEAM_MEN));
    this.newsTeamAges.push(this.translationService.get(TC_NEWS_TEAM_WOMEN));
    const youthTC = this.translationService.get(TC_NEWS_TEAM_YOUTH);
    const genderWoman = this.translationService.get(TC_NEWS_GENDER_W);
    const genderMen = this.translationService.get(TC_NEWS_GENDER_M);
    NEWS_TEAM_YOUTH_AGES.forEach(age => {
      this.newsTeamAges.push(genderMen + ' ' + age + youthTC);
      this.newsTeamAges.push(genderWoman + ' ' + age + youthTC);
    })
  }
}


export enum NewsType {
  report
}
