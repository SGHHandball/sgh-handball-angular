import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Hall} from "./hall";
import {HallsService} from "./halls.service";
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

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent extends AbstractComponent implements OnInit {

  editConst = 'edit';
  deleteConst = 'delete';

  displayedColumns: string[] = [TC_HALLS_HALL_ID, TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY, TC_HALLS_POST_CODE];
  displayedColumnsMobile: string[] = [TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY];
  displayedColumnsAdmin: string[] = [TC_HALLS_HALL_ID, TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY, TC_HALLS_POST_CODE, this.editConst, this.deleteConst];
  displayedColumnsMobileAdmin: string[] = [TC_HALLS_NAME, TC_HALLS_STREET, TC_HALLS_CITY, this.editConst, this.deleteConst];
  dataSource: MatTableDataSource<Hall> = new MatTableDataSource();

  filterTC = TC_FILTER;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public breakpointObserver: BreakpointObserver,
              private hallsService: HallsService,
              public translationService: TranslationService,
              private dialog: MatDialog,
              public adminService: AdminService,
              snackBar: MatSnackBar) {
    super(breakpointObserver,snackBar);
    this.hallsService.loadAllHalls();
  }

  ngOnInit() {
    this.hallsService.hallsObservable.subscribe(halls => {
      this.dataSource = new MatTableDataSource(halls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openHallsEditDialog(hall: Hall | undefined) {
    if (this.adminService.isUserAdmin()) {
      const dialogRef = this.dialog.open(HallsEditDialogComponent, {
          width: this.dialogWidth,
          data: hall
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.hallsService.changeHall(result.hall, result.existing)
            .then((success) => {
              if (success) {
                this.openSnackBar(this.translationService.get(result.existing ? TC_HALLS_EDIT_HALL_SUCCESS : TC_HALLS_ADD_NEW_HALL_SUCCESS));
              } else {
                this.openSnackBar(this.translationService.get(TC_HALLS_EDIT_HALL_FAIL))
              }
            })
            .catch(() => this.openSnackBar(this.translationService.get(TC_HALLS_EDIT_HALL_FAIL)))
        }
      });
    }
  }

  deleteHall(hall: Hall) {
    if (this.adminService.isUserAdmin()) {
      const dialogRef = this.dialog.open(DefaultDialogComponent, {
          width: this.dialogWidth,
          data: new DialogData(TC_GENERAL_DELETE_HEADER, TC_GENERAL_DELETE_MESSAGE)
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.hallsService.deleteHall(hall).then(() => {
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_SUCCESS))
          }).catch(error => {
            if (!environment.production) console.log(error);
            this.openSnackBar(this.translationService.get(TC_GENERAL_DELETE_FAIL))
          });
        }
      });
    }
  }
}

