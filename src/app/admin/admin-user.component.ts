import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SghUser} from "../model/sgh-user";
import {AdminService} from "./admin.service";
import {
  TC_ADMIN_CHANGE_ADMIN_RIGHT_SUCCESS,
  TC_ADMIN_SGH_USER_LAST_NAME,
  TC_ADMIN_SGH_USER_PRE_NAME, TC_FILTER, TC_GENERAL_ERROR,
  TranslationService
} from "../translation.service";
import {AdminUserDialogComponent} from "./admin-user-dialog/admin-user-dialog.component";
import {environment} from "../../environments/environment";
import {of, Subject} from "rxjs";
import {catchError, switchMap, takeUntil} from "rxjs/operators";
import {AbstractService} from "../shared/abstract.service";

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-admin',
  styleUrls: ['admin-user.component.css'],
  templateUrl: 'admin-user.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminUserComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<SghUser> = new MatTableDataSource<SghUser>();
  columnsToDisplay = [TC_ADMIN_SGH_USER_PRE_NAME, TC_ADMIN_SGH_USER_LAST_NAME];
  expandedElement: SghUser | null;

  dataLoaded = false;

  filterTC = TC_FILTER;

  destroy$ = new Subject();

  constructor(
    private adminService: AdminService,
    public translationService: TranslationService,
    private dialog: MatDialog,
    public abstractService: AbstractService,
  ) {
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.adminService.isUserAdmin()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(
          adminRight => {
            if (adminRight) {
              return this.adminService.getAllUsers();
            }
            return of(undefined)
          }
        )
      )
      .subscribe(
        users => {
          if (users) {
            this.dataSource = new MatTableDataSource<SghUser>(users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.dataLoaded = true;
        }
      );
  }

  openAddUserDialog() {
    this.abstractService
      .dialogWidth$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dialogWidth =>
        this.dialog.open(AdminUserDialogComponent, {
            width: dialogWidth
          }
        )
      )
  }

  changeAdminMode(sghUser: SghUser) {
    this.adminService.changeUserRights(sghUser)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          if (!environment.production) console.log(error);
          this.abstractService.openSnackBar(this.translationService.get(TC_GENERAL_ERROR));
          return error;
        })
      ).subscribe(
      _ => {
        this.abstractService.openSnackBar(this.translationService.get(TC_ADMIN_CHANGE_ADMIN_RIGHT_SUCCESS));
      }
    );
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}


