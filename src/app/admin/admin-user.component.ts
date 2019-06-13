import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SghUser} from "./sgh-user";
import {AbstractComponent} from "../abstract/abstract.component";
import {AdminService} from "./admin.service";
import {
  TC_ADMIN_CHANGE_ADMIN_RIGHT_SUCCESS,
  TC_ADMIN_SGH_USER_LAST_NAME,
  TC_ADMIN_SGH_USER_PRE_NAME, TC_FILTER, TC_GENERAL_ERROR,
  TranslationService
} from "../translation.service";
import {AdminUserDialogComponent} from "./admin-user-dialog/admin-user-dialog.component";

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
export class AdminUserComponent extends AbstractComponent implements AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<SghUser> = new MatTableDataSource<SghUser>();
  columnsToDisplay = [TC_ADMIN_SGH_USER_PRE_NAME, TC_ADMIN_SGH_USER_LAST_NAME];
  expandedElement: SghUser | null;

  dataLoaded = false;

  filterTC = TC_FILTER;

  constructor(public breakpointObserver: BreakpointObserver,
              private adminService: AdminService,
              public translationService: TranslationService,
              private dialog: MatDialog,
              snackBar: MatSnackBar,
  ) {
    super(breakpointObserver, snackBar);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.adminService.getAllUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource<SghUser>(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataLoaded = true;
    })
  }

  openAddUserDialog() {
    this.dialog.open(AdminUserDialogComponent, {
        width: this.dialogWidth
      }
    );
  }

  changeAdminMode(sghUser: SghUser) {
    this.adminService.changeAdminMode(sghUser).then(() => {
      this.openSnackBar(this.translationService.get(TC_ADMIN_CHANGE_ADMIN_RIGHT_SUCCESS));
    }).catch(error => {
      console.log(error);
      this.openSnackBar(this.translationService.get(TC_GENERAL_ERROR));
    });
  }

}


