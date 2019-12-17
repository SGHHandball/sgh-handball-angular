import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Hall} from "./hall";
import {
  TC_FILTER,
  TC_HALLS_CITY,
  TC_HALLS_HALL_ID,
  TC_HALLS_NAME,
  TC_HALLS_POST_CODE,
  TC_HALLS_STREET,
  TC_GENERAL_DELETE_HEADER,
  TranslationService,
  TC_GENERAL_DELETE_SUCCESS,
  TC_GENERAL_DELETE_FAIL,
  TC_GENERAL_DELETE_MESSAGE,
  TC_HALLS_ADD_NEW_HALL_SUCCESS,
  TC_HALLS_EDIT_HALL_SUCCESS,
  TC_HALLS_EDIT_HALL_FAIL
} from "../translation.service";
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HallsEditDialogComponent} from "./halls-edit-dialog/halls-edit-dialog.component";
import {AdminService} from "../admin/admin.service";
import {DefaultDialogComponent, DialogData} from "../abstract/default-dialog/default-dialog.component";
import {environment} from "../../environments/environment";
import {of, Subject} from "rxjs";
import {DataService} from "../common/data.service";
import {catchError, share, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent extends AbstractComponent implements OnInit, OnDestroy {

  editConst = 'edit';
  deleteConst = 'delete';

  displayedColumns: string[] = [TC_HALLS_HALL_ID, TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY, TC_HALLS_POST_CODE];
  displayedColumnsMobile: string[] = [TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY];
  displayedColumnsAdmin: string[] = [TC_HALLS_HALL_ID, TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY, TC_HALLS_POST_CODE, this.editConst, this.deleteConst];
  displayedColumnsMobileAdmin: string[] = [TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY, this.editConst, this.deleteConst];
  dataSource: MatTableDataSource<Hall> = new MatTableDataSource();

  filterTC = TC_FILTER;

  destroy$ = new Subject();

  hallAdmin = this.adminService.isUserHallAdmin().pipe(share());

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public breakpointObserver: BreakpointObserver,
              public translationService: TranslationService,
              private dialog: MatDialog,
              public adminService: AdminService,
              private dataService: DataService,
              snackBar: MatSnackBar) {
    super(breakpointObserver, snackBar);
  }

  ngOnInit() {
    this.initHalls();
  }

  initHalls() {
    this.dataService.getAllHalls()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(halls => {
        this.dataSource = new MatTableDataSource(halls);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openHallsEditDialog(hall: Hall | undefined) {
    this.dialog
      .open(
        HallsEditDialogComponent, {
          width: this.dialogWidth,
          data: hall
        }
      )
      .afterClosed()
      .pipe(
        switchMap(
          result => {
            if (result) {
              if (result.existing) {
                return this.dataService.changeHall(result.hall);
              } else {
                return this.dataService.addHall(result.hall);
              }
            }
            return of("Error")
          }
        ),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_HALLS_EDIT_HALL_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (error) {
            this.openSnackBar(this.translationService.get(TC_HALLS_EDIT_HALL_FAIL));
          } else {
            this.openSnackBar(this.translationService.get(TC_HALLS_EDIT_HALL_SUCCESS));
          }
        }
      );
  }

  deleteHall(hall: Hall) {
    this.dialog
      .open(
        DefaultDialogComponent, {
          width: this.dialogWidth,
          data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
        }
      )
      .afterClosed()
      .pipe(
        switchMap(
          result => {
            if (result) {
              return this.dataService.deleteHall(hall);
            }
            return of("Error")
          }
        ),
        catchError(error => {
          this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          if (!environment.production) console.log(error);
          return error;
        })
      )
      .subscribe(
        error => {
          if (error) {
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL));
          } else {
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS));
          }
        }
      );
  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }
}

