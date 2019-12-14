import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {DB_COLLECTION_NEWS, News, NewsType} from "../news/news";
import {FireApiService} from "./fire-api.service";
import {Club, CLUBS_COLLECTION_NAME} from "../clubs/club";
import {DocumentReference} from "@angular/fire/firestore";
import {Team} from "../teams/team";
import {AngularFireUploadTask} from "@angular/fire/storage";
import {ImageProgress} from "../model/image-progress";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected constructor(public service: FireApiService) {
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

  uploadImage(event, subPath?: string): Observable<ImageProgress> {
    return this.service.uploadImage(event, subPath);
  }

  downloadImage(path: string): Observable<string> {
    return this.service.downloadImage(path);
  }

  downloadImages(paths: string[]): Observable<string> {
    return this.service.downloadImages(paths);
  }

  deleteImage(path: string): Observable<any> {
    return this.service.deleteImage(path);
  }
}
