import {News} from "./news";

export interface InfiniteNews {
  news: News[];
  lastItem: any;
}
