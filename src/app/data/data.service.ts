import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {News, NewsType} from "../model/news";
import {FireApiService} from "./fire-api.service";
import {Club} from "../model/club";
import {DocumentReference} from "@angular/fire/firestore";
import {Team} from "../model/team";
import {ImageProgress} from "../model/image-progress";
import {User} from "firebase";
import {SghUser} from "../model/sgh-user";
import {Hall} from "../model/hall";
import {Training} from "../model/training";
import {Season} from "../model/season";
import {Content} from "../model/content";
import {IImage} from "ng2-image-compress";
import {Sponsor} from "../model/sponsor";
import {InfiniteNews} from "../model/infinite-news";
import {Credentials} from "../model/Credentials";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected constructor(private service: FireApiService) {
  }


  login(credentials: Credentials): Observable<any> {
    return this.service.login(credentials);
  }

  logout(): Observable<void> {
    return this.service.logout();
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


  getNewsWithInfinite(lastDoc?, checked?: boolean): Observable<InfiniteNews> {
    return this.service.getNewsWithInfinite(lastDoc, checked);
  }

  getNewsById(id: string): Observable<News> {
    return this.service.getNewsById(id);
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

  updateNews(news: News): Observable<void> {
    return this.service.updateNews(news);
  }

  saveNewsToDataBase(news: News): Observable<void> {
    return this.service.saveNewsToDataBase(news);
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

  getTrainingsByTeamId(teamId: string): Observable<Training[]> {
    return this.service.getTrainingsByTeamId(teamId);
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

  addSeason(season: Season): Observable<string> {
    return this.service.addSeason(season);
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

  deleteSponsor(sponsorId:string): Observable<void> {
    return this.service.deleteSponsor(sponsorId);
  }


}
