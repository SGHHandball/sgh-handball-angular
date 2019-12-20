import {Injectable} from "@angular/core";
import {from, Observable, of} from "rxjs";
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
import {Training} from "../trainings/training";
import {Season} from "../seasons/season";
import {DB_COLLECTION_CONTENT, DB_COLLECTION_SEASONS, DB_COLLECTION_SPONSORS} from "../constants";
import {Content} from "../model/content";
import {IImage} from "ng2-image-compress";
import {environment} from "../../environments/environment";
import {Sponsor} from "../model/sponsor";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected constructor(private service: FireApiService) {
  }

  getUser(): Observable<User> {
    return this.service.getUser();
  }

  addNewUser(credentials: Credentials, prename: string, lastName: string): Observable<void> {
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

  getAllNews(newsType?: NewsType): Observable<News[]> {
    return this.service.getAllNews(newsType);
  }

  getNewsById(id: string): Observable<News> {
    return this.service.getNewsById(id);
  }

  getNormalUserNews(orderAsc: boolean, limit?: number, newsType?: NewsType): Observable<News[]> {
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

  uploadImage(image: IImage, subPath?: string): Observable<ImageProgress> {
    return this.service.uploadImage(image, subPath);
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

  getTeamById(id: string): Observable<Team> {
    return this.service.getTeamById(id);
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

  getAllTrainings(): Observable<Training[]> {
    return this.service.getAllTrainings();
  }

  addTraining(training: Training): Observable<string> {
    return this.service.addTraining(training);
  }

  changeTraining(training: Training): Observable<void> {
    return this.service.changeTraining(training);
  }

  deleteTraining(training: Training): Observable<void> {
    return this.service.deleteTraining(training);
  }

  getSeasons(): Observable<Season[]> {
    return this.service.getSeasons();
  }

  getCurrentSeason(): Observable<Season> {
    return this.service.getCurrentSeason();
  }

  changeCurrentSeason(season: Season): Observable<void> {
    return this.service.changeCurrentSeason(season);
  }

  getContent(topic: string): Observable<Content> {
    return this.service.getContent(topic);
  }

  addContent(topic: string, content: Content): Observable<void> {
    return this.service.addContent(topic, content);
  }

  getSponsors(): Observable<Sponsor[]> {
    return this.service.getSponsors();
  }

  getSponsorsById(id: string): Observable<Sponsor> {
    return this.service.getSponsorsById(id);
  }

  addSponsor(sponsor: Sponsor): Observable<string> {
    return this.service.addSponsor(sponsor);
  }

  changeSponsor(sponsor: Sponsor): Observable<void> {
    return this.service.changeSponsor(sponsor);
  }

  deleteSponsor(sponsor: Sponsor): Observable<void> {
    return this.service.deleteSponsor(sponsor);
  }


}
