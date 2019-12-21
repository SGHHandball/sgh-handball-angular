import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentService} from "./document.service";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatDialog,  MatTreeNestedDataSource} from "@angular/material";
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
import {share, switchMap, takeUntil} from "rxjs/operators";
import {AbstractService} from "../abstract/abstract.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<Document>(document => document.documents);
  dataSource = new MatTreeNestedDataSource<Document>();

  noDocumentsTC = TC_DOCUMENTS_NO_DOCUMENTS;
  documentTC = TC_ROUTE_DOCUMENTS;

  documentsAdmin = this.adminService.isUserDocumentsAdmin().pipe(share());

  destroy$ = new Subject();

  constructor(public documentService: DocumentService,
              public translationService: TranslationService,
              public adminService: AdminService,
              private dialog: MatDialog,
              public abstractService: AbstractService) {
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
    this.abstractService
      .dialogWidth$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(dialogWidth =>
          this.dialog.open(DefaultInputDialogComponent, {
            width: dialogWidth,
            data: new DefaultInputDialogData(
              this.translationService.get(TC_DOCUMENTS_ADD_NEW_FOLDER),
              this.translationService.get(TC_DOCUMENTS_FOLDER_NAME),
              this.translationService.get(TC_GENERAL_REQUIRED_ERROR),
              this.translationService.get(TC_CANCEL),
              this.translationService.get(TC_OK)
            )
          }).afterClosed()
        )
      ).subscribe(result => {
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
            this.abstractService.openSnackBar(this.translationService.get(documentExisting ? TC_DOCUMENTS_ADD_NEW_FOLDER_SUCCESS : TC_GENERAL_EDIT_SUCCESS));
            this.reloadData();
          })
          .catch(() => this.abstractService.openSnackBar(this.translationService.get(documentExisting ? TC_DOCUMENTS_ADD_NEW_FOLDER_FAIL : TC_GENERAL_EDIT_FAIL)));
      }
    })
  }

  addNewFiles(document: Document) {

  }


  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

}
