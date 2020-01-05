export interface News {
  id?: string;
  creator?: string;
  title?: string;
  score?: string;
  body?: string;
  summary?: string;
  players?: string;
  imgPaths?: string[];
  imgLinks?: string[];
  homeTeam?: string;
  enemyTeam?: string;
  teamAge?: string;
  checked?: boolean;
  send?: boolean;
  date?: number;
  eventDate?: number;
  teamSeason?: string;
  type?: NewsType;
}

export enum NewsType {
  NEWS_TYPE_EVENT = 'event',
  NEWS_TYPE_REPORT = 'report',
  NEWS_TYPE_TEAM_EVENT = 'team_event',
  NEWS_TYPE_SPECIAL= 'special',
}

export const NEWS_TEAM_YOUTH_AGES = ['A', 'B', 'C', 'D', 'E', 'F'];

export const DB_COLLECTION_NEWS = 'news';

export function getDateString(date: number | string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function getDateWithTeamAgeAsString(news: News): string {
  return (news.eventDate ? getDateString(news.eventDate) + ' - ' : '') + (news.teamAge ? news.teamAge : '???')
}

export function getTeamsWithScoreAsString(news: News): string {
  return (news.homeTeam ? news.homeTeam : '???') + ' - ' +
    (news.enemyTeam ? news.enemyTeam : '???') + ' ' +
    (news.score ? news.score : '');
}
