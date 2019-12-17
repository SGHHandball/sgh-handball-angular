import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {DB_COLLECTION_NEWS, News, NewsType} from "../news/news";
import {FireApiService} from "./fire-api.service";
import {Club, CLUBS_COLLECTION_NAME} from "../clubs/club";
import {DocumentReference} from "@angular/fire/firestore";
import {Team} from "../teams/team";
import {AngularFireUploadTask} from "@angular/fire/storage";
import {ImageProgress} from "../model/image-progress";
import {User} from "firebase";
import {SghUser} from "../admin/sgh-user";
import {Credentials} from "../app-shell/auth/login-dialog/login-dialog.component";
import {Hall} from "../halls/hall";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected constructor(public service: FireApiService) {
  }

  getUser(): Observable<User> {
    return this.service.getUser();
  }

  addNewUser(credentials: Credentials, prename: string, lastName: string): Observable<boolean> {
    return this.service.addNewUser(credentials, prename, lastName)
  }

  changeUserRights(sghUser: SghUser): Observable<any> {
    return this.service.changeUserRights(sghUser);
  }

  getSghUser(): Observable<SghUser> {
    return this.service.getSghUser();
  }

  getAllSghUsers(): Observable<SghUser[]> {
    return this.service.getAllSghUsers();
  }


  hasUserRightsForTeam(teamAge: string, teamSeason: string): Observable<boolean> {
    return this.service.hasUserRightsForTeam(teamAge, teamSeason);
  }

  getAllNews(orderAsc: boolean, limit?: number, newsType?: NewsType): Observable<News[]> {
    return this.service.getAllNews(orderAsc, limit, newsType);
  }

  getNewsById(id: string): Observable<News[]> {
    return this.service.getNewsById(id);
  }

  getNormalUserNews(orderAsc: boolean, limit: number, newsType?: NewsType): Observable<News[]> {
    return this.service.getNormalUserNews(orderAsc, limit, newsType);
  }

  getTeamNews(teamAge: string, teamSeason: string): Observable<News[]> {
    return this.service.getTeamNews(teamAge, teamSeason);
  }

  addNewNews(newsType: NewsType, newsTeam?: Team): Observable<News> {
    return this.service.addNewNews(newsType, newsTeam);
  }

  getClubs(): Observable<Club[]> {
    return this.service.getClubs();
  }

  addClub(clubName: string): Observable<DocumentReference> {
    return this.service.addClub(clubName);
  }

  deleteNews(news: News): Observable<void> {
    return this.service.deleteNews(news);
  }

  updateNewsSendToTrue(news: News): Observable<void> {
    return this.service.updateNewsSendToTrue(news);
  }

  updateNewsCheckToTrue(news: News): Observable<void> {
    return this.service.updateNewsCheckToTrue(news);
  }


  saveNewsToDataBase(news: News): Observable<void> {
    return this.service.saveNewsToDataBase(news);
  }

  updateImagesInNews(news: News): Observable<void> {
    return this.service.updateImagesInNews(news);
  }

  updateImagesInTeam(team: Team): Observable<void> {
    return this.service.updateImagesInTeam(team);
  }

  uploadImage(event, subPath?: string): Observable<ImageProgress> {
    return this.service.uploadImage(event, subPath);
  }

  getDownloadPath(path: string): Observable<string> {
    return this.service.getDownloadPath(path);
  }

  downloadImages(paths: string[]): Observable<string> {
    return this.service.downloadImages(paths);
  }

  deleteImage(path: string): Observable<any> {
    return this.service.deleteImage(path);
  }

  getTeamsBySeason(season: string): Observable<Team[]> {
    return this.service.getTeamsBySeason(season);
  }

  getTeamsBySeasonAndAge(season: string, teamAge: string): Observable<Team[]> {
    return this.service.getTeamsBySeasonAndAge(season, teamAge);
  }

  addNewTeam(position: number, season: string, teamAge: string): Observable<string> {
    return this.service.addNewTeam(position, season, teamAge);
  }

  updateTeam(team: Team): Observable<void> {
    return this.service.updateTeam(team);
  }

  deleteTeam(team: Team): Observable<void> {
    return this.service.deleteTeam(team);
  }

  changeOrderOfTeams(teams: Team[]): Observable<void> {
    return this.service.changeOrderOfTeams(teams);
  }

  getAllHalls(): Observable<Hall[]> {
    return this.service.getAllHalls();
  }

  addHall(hall: Hall): Observable<string> {
    return this.service.addHall(hall);
  }

  changeHall(hall: Hall): Observable<void> {
    return this.service.changeHall(hall);
  }

  deleteHall(hall: Hall): Observable<void> {
    return this.service.deleteHall(hall);
  }
}
