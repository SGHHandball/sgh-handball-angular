import {DEFAULT_YEAR} from "../teams/teams.service";

export class News {
  id: string = '';
  creator: string = '';
  title: string = '';
  score: string = '0:0 (0:0)';
  body: string = '';
  summary: string = '';
  imgLink: string = '';
  homeTeam: string = '';
  enemyTeam: string = '';
  teamAge: string = '';
  checked: boolean = false;
  send: boolean = false;
  date: Date = new Date();
  teamYear: string = DEFAULT_YEAR;


  withTitleAndBody(title: string, body: string): News {
    this.title = title;
    this.body = body;
    return this;
  }

  withSummary(summary: string): News {
    this.summary = summary;
    return this;
  }

  withImgLink(imgLink: string): News {
    this.imgLink = imgLink;
    return this;
  }

  withCreator(creator: string): News {
    this.creator = creator;
    return this;
  }


}

export const NEWS_TEAM_YOUTH_AGES = ['A', 'B', 'C', 'D', 'E', 'F'];

export const DB_COLLECTION_NEWS = 'news';

export function getDateString(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function getDateWithTeamAgeAsString(news: News): string {
  return (news.date ? getDateString(news.date) + ' - ' : '') + (news.teamAge ? news.teamAge : '???')
}

export function getTeamsWithScoreAsString(news: News): string {
  return (news.homeTeam ? news.homeTeam : '???') + ' - ' +
    (news.enemyTeam ? news.enemyTeam : '???') + ' ' +
    (news.score ? news.score : '');
}
