import {News} from "../news/news";

export interface InfiniteNews {
  news: News[];
  lastItem: any;
}
