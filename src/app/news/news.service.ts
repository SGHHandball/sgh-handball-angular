import {Injectable} from '@angular/core';
import {DB_COLLECTION_NEWS, News, NEWS_TEAM_YOUTH_AGES} from "./news";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {
  TC_NEWS_GENDER_M, TC_NEWS_GENDER_W,
  TC_NEWS_PATH_EDIT,
  TC_NEWS_TEAM_MEN, TC_NEWS_TEAM_WOMEN, TC_NEWS_TEAM_YOUTH, TC_NEWS_TYPE_EVENT,
  TC_NEWS_TYPE_REPORT,
  TranslationService
} from "../translation.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "firebase";
import {Club, CLUBS_COLLECTION_NAME} from "../clubs/club";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {AbstractNewsService} from "../abstract/abstract-news.service";
import {Team} from "../teams/team";

@Injectable({
  providedIn: 'root'
})
export class NewsService extends AbstractNewsService {
  clubs: Club[];

  newsTeamAges: string[] = [];

  filters: string[] = [];

  constructor(db: AngularFirestore,
              afAuth: AngularFireAuth,
              afStorage: AngularFireStorage,
              private router: Router,
              translationService: TranslationService) {
    super(db, afAuth, afStorage, translationService);
    this.addTeamAges();
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


  getFilterNews(filterValues: string[]): News[] {
    let returnNewsArray = this.news;
    if (this.news && filterValues && filterValues.length > 0) {
      returnNewsArray = [];
      this.news.forEach(news => {
        if (this.areFiltersInNews(news, filterValues) && !returnNewsArray.includes(news)) {
          returnNewsArray.push(news);
        }
      });
      return returnNewsArray;
    }
    return returnNewsArray;

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
    return (news.homeTeam && news.homeTeam.toLowerCase().includes(filter)) ||
      (news.enemyTeam && news.enemyTeam.toLowerCase().includes(filter)) ||
      (news.body && news.body.toLowerCase().includes(filter)) ||
      (news.title && news.title.toLowerCase().includes(filter)) ||
      (news.summary && news.summary.toLowerCase().includes(filter)) ||
      (news.teamAge && news.teamAge.toLowerCase() === filter) ||
      (news.teamSeason && news.teamSeason.toLowerCase() === filter)
      ;
  }


  saveNewClubToCollection(clubName: string) {
    if (!this.isClubListContainingClubName(clubName)) {
      this.db.collection<Club>(CLUBS_COLLECTION_NAME).add(JSON.parse(JSON.stringify(new Club(clubName))));
    }
  }

  isClubListContainingClubName(clubName: string): boolean {
    if (!clubName || clubName.length === 0 || clubName === '') return true;
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


  addNewNews(newsType: string, newsTeam?: Team) {
    if (this.user) {
      const newsTypeText = this.getNewNewsInitText(newsType);
      const newNews = new News()
        .withTitleAndBody(newsTypeText, newsTypeText)
        .withType(newsType.toString())
        .withCreator(this.user.uid);

      if (newsTeam) {
        newNews.teamAge = newsTeam.teamAge;
        newNews.teamSeason = newsTeam.teamSeason;
      }

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


  openNewsEdit(toExpandNews: News) {
    this.changeExpandedNews(toExpandNews);
    this.router.navigate([this.getNormalizedUrl(this.router.url) + '/' + TC_NEWS_PATH_EDIT])
  }

  getNormalizedUrl(url: string): string {
    if (url.charAt(url.length - 1) === '/') {
      url = url.replace('/', '');
    }
    return url;
  }

  closeExpandedNews() {
    this.changeExpandedNews(undefined);
    this.router.navigate([this.getNormalizedUrl(this.router.url.replace('/' + TC_NEWS_PATH_EDIT, ''))])
  }


  changeExpandedNews(toExpandNews: News | undefined) {
    this.expandedNews = toExpandNews;
  }


}

