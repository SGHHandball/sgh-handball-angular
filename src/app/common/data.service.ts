import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {News} from "../news/news";
import {FireApiService} from "./fire-api.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected constructor(public service: FireApiService) {
  }

  getAllNews(orderAsc: boolean, limit: number): Observable<News[]> {
    return this.service.getAllNews(orderAsc, limit);
  }

  getNormalUserNews(orderAsc: boolean, limit: number): Observable<News[]> {
    return this.service.getNormalUserNews(orderAsc, limit);
  }
}
