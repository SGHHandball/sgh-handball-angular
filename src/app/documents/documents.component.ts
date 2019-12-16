import {Component, OnInit} from '@angular/core';
import {DocumentService} from "./document.service";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatDialog, MatSnackBar, MatTreeNestedDataSource} from "@angular/material";
import {Document} from "./document";
import {
  TC_CANCEL,
  TC_DOCUMENTS_ADD_NEW_FOLDER,
  TC_DOCUMENTS_ADD_NEW_FOLDER_FAIL,
  TC_DOCUMENTS_ADD_NEW_FOLDER_SUCCESS,
  TC_DOCUMENTS_FOLDER_NAME,
  TC_DOCUMENTS_NO_DOCUMENTS, TC_GENERAL_EDIT_FAIL, TC_GENERAL_EDIT_SUCCESS,
  TC_GENERAL_REQUIRED_ERROR,
  TC_OK,
  TC_ROUTE_DOCUMENTS,
  TranslationService
} from "../translation.service";
import {AdminService} from "../admin/admin.service";
import {
  DefaultInputDialogComponent,
  DefaultInputDialogData
} from "../abstract/default-input-dialog/default-input-dialog.component";
import {AbstractComponent} from "../abstract/abstract.component";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent extends AbstractComponent implements OnInit {

  treeControl = new NestedTreeControl<Document>(document => document.documents);
  dataSource = new MatTreeNestedDataSource<Document>();

  noDocumentsTC = TC_DOCUMENTS_NO_DOCUMENTS;
  documentTC = TC_ROUTE_DOCUMENTS;


  constructor(breakpointObserver: BreakpointObserver,
              snackBar: MatSnackBar,
              public documentService: DocumentService,
              public translationService: TranslationService,
              public adminService: AdminService,
              private dialog: MatDialog) {
    super(breakpointObserver, snackBar);
  }

  hasChild = (_: number, document: Document) => !!document.documents && document.documents.length > 0;

  ngOnInit(): void {
    this.documentService.loadAllDocuments().then(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.dataSource.data = this.documentService.documents;
  }

  addNewFolder(document: Document) {
    const dialogRef = this.dialog.open(DefaultInputDialogComponent, {
      width: this.dialogWidth,
      data: new DefaultInputDialogData(
        this.translationService.get(TC_DOCUMENTS_ADD_NEW_FOLDER),
        this.translationService.get(TC_DOCUMENTS_FOLDER_NAME),
        this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
        this.translationService.get(TC_CANCEL),
        this.translationService.get(TC_OK)
      )
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let documentExisting = false;
        if (document) {
          document.documents.push(new Document(result));
          documentExisting = true;
        } else {
          document = new Document(result);
        }
        this.documentService.changeDocument(document, documentExisting)
          .then(() => {
            this.openSnackBar(this.translationService.get(documentExisting ? TC_DOCUMENTS_ADD_NEW_FOLDER_SUCCESS : TC_GENERAL_EDIT_SUCCESS));
            this.reloadData();
          })
          .catch(() => this.openSnackBar(this.translationService.get(documentExisting ? TC_DOCUMENTS_ADD_NEW_FOLDER_FAIL : TC_GENERAL_EDIT_FAIL)));
      }
    })
  }

  addNewFiles(document: Document) {

  }

}
