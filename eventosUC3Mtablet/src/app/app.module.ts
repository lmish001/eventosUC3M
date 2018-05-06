import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {InscriptionsPage} from '../pages/inscriptions/inscriptions';
import {FavoritesPage} from '../pages/favorites/favorites';
import {NotificationsPage} from '../pages/notifications/notifications';
import {EventDetailPage} from '../pages/event-detail/event-detail';
import {UserDetailPage} from '../pages/user-detail/user-detail';
import {ConfigNotificationsPage} from '../pages/config-notifications/config-notifications';
import { MisEventosPage } from '../pages/mis-eventos/mis-eventos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Services
import {EventService} from '../services/event.service';
import { LoginPage } from '../pages/login/login';
import { AuthentificationService } from '../services/authentification.service';


import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { CreateEventPage } from '../pages/create-event/create-event';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { Dialogs } from '@ionic-native/dialogs';
import { SearchPage } from '../search/search';
import { SearchResultsPage } from '../search-results/search-results';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InscriptionsPage,
    FavoritesPage,
    NotificationsPage,
    EventDetailPage,
    UserDetailPage,
    ConfigNotificationsPage,
    LoginPage,
    MisEventosPage,
    EditEventPage,
    CreateEventPage,
    SearchPage,
    SearchResultsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxErrorsModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InscriptionsPage,
    FavoritesPage,
    NotificationsPage,
    EventDetailPage,
    UserDetailPage,
    ConfigNotificationsPage,
    LoginPage,
    MisEventosPage,
    EditEventPage,
    CreateEventPage,
    SearchPage,
    SearchResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    AuthentificationService,
    AngularFireAuth,
    AngularFireStorageModule,
    Dialogs
  ]
})
export class AppModule {}
