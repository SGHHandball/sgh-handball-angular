import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireFunctionsModule} from "@angular/fire/functions";
import {ImageCompressService, ResizeOptions} from "ng2-image-compress";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/auth, only needed for auth features,
    AngularFireFunctionsModule,
  ],
  providers: [
    ImageCompressService,
    ResizeOptions,
  ]
})
export class DataModule {
}
