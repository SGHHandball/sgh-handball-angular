import {Injectable} from '@angular/core';
// @ts-ignore
import translation_de from '../assets/str/translation_de.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  translationJson;

  constructor() {
    const userLang = navigator.language;
    switch (userLang) {
      default:
        this.translationJson = translation_de;
    }
  }

  public get(translationConst: string): string {
    return this.translationJson[translationConst];
  }
}


export const TC_BEST_CLUB_ON_EARTH = 'best-club-on-earth';

export const TC_ROUTE_HEADER_CLUB = 'club';
export const TC_ROUTE_HEADER_INFO = 'info';
export const TC_ROUTE_HEADER_OTHER = 'other';


export const TC_ROUTE_SGH = 'sgh';
export const TC_ROUTE_NEWS = 'aktuelles';
export const TC_PATH_EDIT = 'bearbeiten';
export const TC_ROUTE_EVENTS = 'events';
export const TC_ROUTE_DETAIL = 'detail';


export const TC_ROUTE_CONTENT = 'informationen';
export const TC_ROUTE_HOME_EDIT = 'home-bearbeiten';
export const TC_ROUTE_EXECUTIVES = 'vorstand';
export const TC_ROUTE_REFEREES = 'schiedsrichter';
export const TC_ROUTE_TIME_KEEPER = 'zeitnehmer';
export const TC_ROUTE_CDH = 'club-der-hunderter';

export const TC_ROUTE_HOME = 'home';
export const TC_ROUTE_TEAMS = 'mannschaften';

export const TC_ROUTE_GENERAL_INFORMATION = 'allgemeine-informationen';
export const TC_ROUTE_TRAINING = 'trainingszeiten';
export const TC_ROUTE_DOCUMENTS = 'dokumente';

export const TC_ROUTE_SPONSORS = 'sponsoren';
export const TC_ROUTE_HALLS = 'hallenverzeichnis';
export const TC_ROUTE_IMPRINT = 'impressum';
export const TC_ROUTE_SEASONS = 'saisons';


export const TC_ADMIN = 'admin';
export const TC_USERS = 'users';
export const TC_CANCEL = 'cancel';
export const TC_OK = 'ok';
export const TC_BACK = 'back';
export const TC_SAVE = 'save';
export const TC_LOGIN = 'login';
export const TC_LOGOUT = 'logout';
export const TC_EMAIL = 'email';
export const TC_PASSWORD = 'password';
export const TC_FILTER = 'filter';
export const TC_IMAGES = 'images';

export const TC_DELETE = 'delete';
export const TC_EDIT = 'edit';
export const TC_SEND = 'send';
export const TC_MAKE_VISIBLE = 'make-visible';


export const TC_GENERAL_ERROR = 'general-error';
export const TC_GENERAL_REQUIRED_ERROR = 'general-required-error';
export const TC_GENERAL_DELETE_HEADER = 'general-delete-header';
export const TC_GENERAL_DELETE_MESSAGE = 'general-delete-message';
export const TC_GENERAL_DELETE_SUCCESS = 'general-delete-success';
export const TC_GENERAL_DELETE_FAIL = 'general-delete-fail';
export const TC_GENERAL_EDIT_SUCCESS = 'general-edit-success';
export const TC_GENERAL_EDIT_FAIL = 'general-edit-fail';

export const TC_NEWS_HEADER = 'news-header';
export const TC_EDIT_NEWS = 'edit-news';
export const TC_NEWS_TITLE = 'news-title';
export const TC_NEWS_SCORE = 'news-score';
export const TC_NEWS_SUMMARY = 'news-summary';
export const TC_NEWS_PLAYERS = 'news-players';
export const TC_NEWS_BODY = 'news-body';
export const TC_NEWS_DATE = 'news-date';
export const TC_NEWS_GENDER_W = 'news-gender-w';
export const TC_NEWS_GENDER_M = 'news-gender-m';
export const TC_NEWS_TEAM_AGE = 'news-team-age';
export const TC_NEWS_TEAM_YOUTH = 'news-team-youth';
export const TC_NEWS_TEAM_MEN = 'news-team-men';
export const TC_NEWS_TEAM_WOMEN = 'news-team-women';
export const TC_NEWS_HOME_TEAM = 'news-home-team';
export const TC_NEWS_ENEMY_TEAM = 'news-enemy-team';
export const TC_NEWS_TYPE_REPORT = 'news-type-report';
export const TC_NEWS_TYPE_EVENT = 'news-type-event';
export const TC_NEWS_TYPE_DESCRIPTION = 'news-type-description';
export const TC_NEWS_SEASON = 'news-team-season';
export const TC_NEWS_NO_NEWS = 'news-no-news';
export const TC_NEWS_UNSAVED_DATA_WARNING_HEADER = 'news-unsaved-data-warning-header';
export const TC_NEWS_UNSAVED_DATA_WARNING = 'news-unsaved-data-warning';
export const TC_NEWS_SEND_HEADER = 'news-send-header';
export const TC_NEWS_SEND_MESSAGE = 'news-send-message';
export const TC_NEWS_CHECKED_HEADER = 'news-checked-header';
export const TC_NEWS_CHECKED_MESSAGE = 'news-checked-message';
export const TC_NEWS_EXPORT_CHECK_BOX = 'news-export-check-box';
export const TC_NEWS_EXPORT = 'news-export';

export const TC_IMPRINT_LOGIN_DIALOG_ERROR_INVALID_EMAIL = 'imprint-login-dialog-error-invalid-email';
export const TC_IMPRINT_LOGIN_DIALOG_ERROR_EMAIL_REQUIRED = 'imprint-login-dialog-error-email-required';
export const TC_IMPRINT_LOGIN_DIALOG_ERROR_PASSWORD_REQUIRED = 'imprint-login-dialog-error-password-required';

export const TC_ADMIN_SGH_USER_PRE_NAME = 'preName';
export const TC_ADMIN_SGH_USER_LAST_NAME = 'lastName';
export const TC_ADMIN_ADD_NEW_USER = 'admin-add-new-user';
export const TC_ADMIN_ADD_NEW_USER_SUCCESS = 'admin-add-new-user-success';
export const TC_ADMIN_ADD_NEW_USER_ERROR = 'admin-add-new-user-error';
export const TC_ADMIN_USER_DIALOG_PW_TO_SHORT = 'admin-user-dialog-pw-to-short';
export const TC_ADMIN_CHANGE_ADMIN_RIGHT_SUCCESS = 'admin-change-admin-right-success';

export const TC_AUTH_LOGIN_SUCCESS = 'auth-login-success';
export const TC_AUTH_LOGIN_ERROR = 'auth-login-error';
export const TC_AUTH_LOGOUT_SUCCESS = 'auth-logout-success';
export const TC_AUTH_LOGOUT_ERROR = 'auth-logout-error';

export const TC_HALLS_EDIT_HALL = 'halls-edit-hall';
export const TC_HALLS_ADD_NEW_HALL_SUCCESS = 'halls-add-new-hall-success';
export const TC_HALLS_EDIT_HALL_SUCCESS = 'halls-edit-hall-success';
export const TC_HALLS_EDIT_HALL_FAIL = 'halls-edit-hall-fail';
export const TC_HALLS_HALL_ID = 'hallId';
export const TC_HALLS_NAME = 'name';
export const TC_HALLS_STREET = 'street';
export const TC_HALLS_CITY = 'city';
export const TC_HALLS_POST_CODE = 'postCode';

export const TC_TEAMS_CHANGE_ORDER = 'teams-change-order';
export const TC_TEAMS_ADD_NEW_TEAM = 'teams-add-new-team';
export const TC_TEAMS_DELETE_TEAM = 'teams-delete-team';
export const TC_TEAMS_EDIT_TEAM_PAGE = 'teams-edit-team-page';
export const TC_TEAMS_ADD_NEW_TEAM_SUCCESS = 'teams-add-new-team-success';
export const TC_TEAMS_ADD_NEW_TEAM_FAIL = 'teams-add-new-team-fail';
export const TC_TEAMS_TEAM = 'teams-team';
export const TC_TEAMS_NEWS_HEADER = 'teams-news-header';
export const TC_TEAMS_NO_TEAMS = 'teams-no-teams';

export const TC_TRAININGS_EDIT_TRAINING = 'trainings-edit-training';
export const TC_TRAININGS_ADD_NEW_TRAINING_SUCCESS = 'trainings-add-new-training-success';
export const TC_TRAININGS_EDIT_TRAINING_SUCCESS = 'trainings-edit-training-success';
export const TC_TRAININGS_EDIT_TRAINING_FAIL = 'trainings-edit-training-fail';
export const TC_TRAININGS_TRAINING_TEAM = 'team';
export const TC_TRAININGS_TRAINING_TEAM_NAME = 'trainings-training-team-name';
export const TC_TRAININGS_TRAINING_TEAM_VINTAGE = 'trainings-training-team-vintage';
export const TC_TRAININGS_TRAINING_DATES_DAY = 'trainings-training-dates-day';
export const TC_TRAININGS_TRAINING_DATES_TIME = 'trainings-training-dates-time';
export const TC_TRAININGS_TRAINING_DATES_HALL = 'trainings-training-dates-hall';
export const TC_TRAININGS_TRAINING_DATE = 'date';
export const TC_TRAININGS_TRAINING_TRAINER = 'trainer';
export const TC_TRAININGS_TRAINING_TRAINER_NAME = 'trainings-training-trainer-name';
export const TC_TRAININGS_TRAINING_TRAINER_MAIL = 'trainings-training-trainer-mail';

export const TC_IMPRINT_FIND_MAIN_PAGE = 'imprint-main-page';
export const TC_IMPRINT_FIND_DATA_PROTECTION = 'imprint-find-data-protection';
export const TC_IMPRINT_HERE = 'imprint-here';

export const TC_DOCUMENTS_NO_DOCUMENTS = 'documents-no-documents';
export const TC_DOCUMENTS_ADD_NEW_FOLDER = 'documents-add-new-folder';
export const TC_DOCUMENTS_ADD_NEW_FOLDER_SUCCESS = 'documents-add-new-folder-success';
export const TC_DOCUMENTS_ADD_NEW_FOLDER_FAIL = 'documents-add-new-folder-fail';
export const TC_DOCUMENTS_FOLDER_NAME = 'documents-folder-name';

